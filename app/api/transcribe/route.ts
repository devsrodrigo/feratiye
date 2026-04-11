
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export const dynamic = 'force-dynamic'; // Keep this!

export async function POST(req) {
  // ✅ INITIALIZE INSIDE THE FUNCTION
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });

  // ... rest of your code
}

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
  let resolvedAudioPath = '';

  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!isValidHttpUrl(url)) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // 1. Get metadata (caption/description)
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
      model: 'gpt-4o-mini-transcribe',
    });

    // 4. Structure with GPT
    const systemPrompt = `You are a professional chef assistant specialized in converting cooking videos into clean, structured recipes.

You will receive:
1. A raw transcript of a cooking video
2. A caption (which may contain ingredients)

Your task:
Generate a clean recipe in Spanish using EXACTLY this structure:

URL:
{original_url}

Ingredientes
(list)

Procedimiento
01
(step)
02
(step)
...

STRICT RULES:

INGREDIENTES:
* If caption contains "Ingredientes", prioritize extracting from there
* Preserve original ingredient names when possible
* Clean formatting (one ingredient per line)
* Remove emojis and irrelevant text
* If missing, infer from transcript carefully

PROCEDIMIENTO:
* MUST be 5 to 7 steps (MAX 7, IDEAL 6)
* Each step MUST be <= 15 words
* MUST be written in Spanish
* MUST use imperative form (2nd person singular: "pon", "cocina", "mezcla")
* DO NOT use "ustedes"
* Each step must start with a verb
* Steps must be clear, concise, and actionable
* Remove filler words completely

GENERAL:
* Do NOT add explanations
* Do NOT add extra sections
* Do NOT hallucinate complex ingredients
* Keep output minimal and structured
* Output ONLY the final recipe`;

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
        { error: 'yt-dlp not found in PATH. Install with: brew install yt-dlp ffmpeg' },
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
