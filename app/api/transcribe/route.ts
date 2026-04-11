import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// Forces the route to be dynamic (required for API routes using env vars)
export const dynamic = 'force-dynamic';

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

async function getVideoMetadata(url: string): Promise<{ description?: string; title?: string }> {
  const args = [
    url,
    '--dump-json',
    '--no-warnings',
    '--no-check-certificates',
    '--prefer-free-formats',
    '--youtube-skip-dash-manifest',
  ];

  const { stdout } = await execFileAsync('yt-dlp', args);
  const firstJsonLine = stdout.split('\n').find((line) => line.trim().length > 0);

  if (!firstJsonLine) {
    return {};
  }

  try {
    return JSON.parse(firstJsonLine);
  } catch {
    return {};
  }
}

async function downloadAudio(url: string, outputTemplate: string): Promise<void> {
  const args = [
    url,
    '-x',
    '--audio-format',
    'mp3',
    '--no-warnings',
    '--output',
    outputTemplate,
  ];

  await execFileAsync('yt-dlp', args);
}

export async function POST(req: NextRequest) {
  // Initialize OpenAI INSIDE the POST function to avoid build-time errors
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });

  let resolvedAudioPath = '';

  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!isValidHttpUrl(url)) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // 1. Get metadata
    const metadata = await getVideoMetadata(url);
    const caption = metadata.description || metadata.title || '';

    // 2. Download audio
    const tempDir = os.tmpdir();
    const audioBasePath = path.join(tempDir, `audio_${Date.now()}`);
    await downloadAudio(url, `${audioBasePath}.%(ext)s`);

    const expectedMp3Path = `${audioBasePath}.mp3`;
    if (fs.existsSync(expectedMp3Path)) {
      resolvedAudioPath = expectedMp3Path;
    } else {
      const files = fs.readdirSync(tempDir);
      const matched = files.find((file) => file.startsWith(path.basename(audioBasePath)));
      if (!matched) {
        throw new Error('Audio file not found after download');
      }
      resolvedAudioPath = path.join(tempDir, matched);
    }

    // 3. Transcribe using OpenAI
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(resolvedAudioPath),
      model: 'whisper-1', // Note: Corrected to standard whisper model name
    });

    // 4. Structure with GPT
    const systemPrompt = `You are a professional chef assistant specialized in converting cooking videos into clean, structured recipes.
Generate a clean recipe in Spanish using EXACTLY this structure:
URL: {original_url}
Ingredientes (list)
Procedimiento (numbered steps)`;

    const userPrompt = `URL: ${url}\n\nCAPTION:\n${caption}\n\nTRANSCRIPT:\n${transcription.text}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0,
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ result });

  } catch (error: unknown) {
    console.error('Transcription error:', error);
    const errorWithCode = error as { code?: string; message?: string };

    if (errorWithCode.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'yt-dlp not found. Please ensure it is installed in the environment.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: errorWithCode.message || 'Internal server error' },
      { status: 500 },
    );
  } finally {
    if (resolvedAudioPath && fs.existsSync(resolvedAudioPath)) {
      fs.unlinkSync(resolvedAudioPath);
    }
  }
}