import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';
import ffmpegStatic from 'ffmpeg-static';
import { cleanTiktokUrl } from '@/lib/tiktok';

const execFileAsync = promisify(execFile);

// Forces the route to be dynamic (required for API routes using env vars)
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/** Modelo de audio -> texto. */
const TRANSCRIPTION_MODEL = 'gpt-4o-transcribe';
/** Modelo que estructura la receta. Full, no mini: la estructura importa. */
const STRUCTURING_MODEL = 'gpt-4o';

const CATEGORIES = [
  'Desayunos',
  'Botanas',
  'Salsas y Guarniciones',
  'Arroz',
  'Casera',
  'Pastas',
  'Cocina Asiática',
  'Cocina Americana',
  'Del Mar',
  'Saludable',
  'Bebidas',
  'Postres',
] as const;

const SYSTEM_PROMPT = `Eres el editor de recetas de feratiye.com. Conviertes videos de cocina en fichas de receta limpias, en español de México.

Devuelves ÚNICAMENTE un objeto JSON válido, sin markdown ni texto alrededor, con esta forma exacta:

{
  "title": string,
  "category": string,
  "description": string,
  "ingredients": string[],
  "steps": string[]
}

REGLAS DE "steps" (las más importantes, no las rompas):
1. ENTRE 5 Y 7 PASOS. Nunca 4, nunca 8. Si el video tiene más acciones, agrupa
   varias en un mismo paso; si tiene menos, sepáralas con más detalle.
2. CADA paso empieza con un VERBO EN IMPERATIVO INFORMAL (tuteo, segunda persona
   del singular): "Corta...", "Agrega...", "Licúa...", "Sofríe...", "Mezcla...",
   "Hornea...", "Sirve...". NUNCA empieces con infinitivo ("Cortar"), ni con
   gerundio ("Cortando"), ni con "Se corta", ni con "Primero", ni con un número.
3. Una sola oración por paso, en tiempo presente, de 8 a 25 palabras.
4. El último paso es el de emplatar o servir.
5. Nada de marcas, nada de "como viste en el video", nada de referencias a TikTok.

REGLAS DE "ingredients":
- Cantidad + ingrediente, uno por línea: "2 dientes de Ajo", "½ taza de Crema".
- Ingrediente con Mayúscula Inicial. Usa fracciones (½, ¼, ⅓) y "cda." / "cdita.".
- Toma las cantidades del caption cuando existan; el audio manda para el resto.
- Ordena en el orden en que se usan.

REGLAS DE "title": el nombre del platillo, en Title Case, sin emojis, sin hashtags,
sin signos de admiración. Máximo 6 palabras.

REGLAS DE "description": UNA a DOS oraciones (máximo 30 palabras), en tercera
persona, describiendo sabor y textura. Sin imperativos y sin "esta receta".

REGLAS DE "category": exactamente uno de: ${CATEGORIES.join(' | ')}.`;

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

  const { stdout } = await execFileAsync('yt-dlp', args, { maxBuffer: 32 * 1024 * 1024 });
  const firstJsonLine = stdout.split('\n').find((line) => line.trim().length > 0);

  if (!firstJsonLine) return {};

  try {
    return JSON.parse(firstJsonLine);
  } catch {
    return {};
  }
}

/**
 * Ruta de ffmpeg empaquetado por `ffmpeg-static`, si está instalado.
 * Evita depender de que el usuario tenga ffmpeg en el PATH del sistema.
 */
function bundledFfmpegDir(): string | null {
  try {
    const ffmpegPath = ffmpegStatic as unknown as string | null;
    return ffmpegPath ? path.dirname(ffmpegPath) : null;
  } catch {
    return null;
  }
}

/**
 * Baja el audio del video.
 *
 * Primero intenta bajar la pista de audio TAL CUAL (`-f ba`): TikTok ya la sirve
 * como mp3/m4a, así que no hace falta ffmpeg y es el camino rápido. Solo si eso
 * falla se recurre a `-x --audio-format mp3`, que sí necesita ffmpeg — y para
 * eso se le pasa el binario de `ffmpeg-static` cuando existe.
 *
 * Este era el punto de falla: `--dump-json` funciona sin ffmpeg, la extracción no.
 */
async function downloadAudio(url: string, outputTemplate: string): Promise<void> {
  const baseArgs = [url, '--no-warnings', '--no-playlist', '--output', outputTemplate];

  try {
    await execFileAsync('yt-dlp', ['-f', 'ba/bestaudio/best', ...baseArgs], {
      maxBuffer: 32 * 1024 * 1024,
    });
    return;
  } catch (directDownloadError) {
    const ffmpegDir = bundledFfmpegDir();
    const conversionArgs = [
      '-x',
      '--audio-format',
      'mp3',
      ...(ffmpegDir ? ['--ffmpeg-location', ffmpegDir] : []),
      ...baseArgs,
    ];

    try {
      await execFileAsync('yt-dlp', conversionArgs, { maxBuffer: 32 * 1024 * 1024 });
    } catch {
      // Se reporta el primer error: suele ser el más informativo.
      throw directDownloadError;
    }
  }
}

/** Formatos de audio que acepta la API de transcripción de OpenAI. */
const SUPPORTED_AUDIO = ['.mp3', '.m4a', '.mp4', '.mpeg', '.mpga', '.wav', '.webm'];

function resolveDownloadedAudio(audioBasePath: string): string {
  const tempDir = path.dirname(audioBasePath);
  const prefix = path.basename(audioBasePath);

  const candidates = fs.readdirSync(tempDir).filter((file) => file.startsWith(prefix));
  if (!candidates.length) throw new Error('Audio file not found after download');

  // Se prefiere un formato que OpenAI entienda tal cual.
  const supported = candidates.find((file) =>
    SUPPORTED_AUDIO.includes(path.extname(file).toLowerCase()),
  );

  if (!supported) {
    throw new Error(
      `El audio se descargó como "${candidates[0]}", formato que la API no acepta. ` +
        'Instala ffmpeg (brew install ffmpeg) para poder convertirlo a mp3.',
    );
  }

  return path.join(tempDir, supported);
}

function parseRecipeJson(raw: string | null) {
  if (!raw) throw new Error('Empty response from the model');
  const cleaned = raw.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  return JSON.parse(cleaned);
}

async function transcribeOne(openai: OpenAI, rawUrl: string) {
  const url = cleanTiktokUrl(rawUrl);
  let resolvedAudioPath = '';

  try {
    const metadata = await getVideoMetadata(url);
    const caption = metadata.description || metadata.title || '';

    const audioBasePath = path.join(os.tmpdir(), `audio_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
    await downloadAudio(url, `${audioBasePath}.%(ext)s`);
    resolvedAudioPath = resolveDownloadedAudio(audioBasePath);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(resolvedAudioPath),
      model: TRANSCRIPTION_MODEL,
      language: 'es',
    });

    const completion = await openai.chat.completions.create({
      model: STRUCTURING_MODEL,
      response_format: { type: 'json_object' },
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `URL: ${url}\n\nCAPTION:\n${caption}\n\nTRANSCRIPCIÓN:\n${transcription.text}`,
        },
      ],
    });

    const recipe = parseRecipeJson(completion.choices[0].message.content);

    // Red de seguridad: si el modelo se pasa de pasos, se recorta.
    if (Array.isArray(recipe.steps) && recipe.steps.length > 7) {
      recipe.steps = recipe.steps.slice(0, 7);
    }

    return { url, ok: true as const, recipe: { ...recipe, tiktokUrl: url } };
  } finally {
    if (resolvedAudioPath && fs.existsSync(resolvedAudioPath)) {
      fs.unlinkSync(resolvedAudioPath);
    }
  }
}

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const body = await req.json();

    // Acepta una sola URL (`url`) o varias (`urls`, o `url` con saltos de línea).
    const rawList: string[] = Array.isArray(body.urls)
      ? body.urls
      : String(body.url ?? '').split(/[\n,\s]+/);

    const urls = rawList.map((value) => String(value).trim()).filter(Boolean);

    if (!urls.length) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const invalid = urls.filter((url) => !isValidHttpUrl(url));
    if (invalid.length) {
      return NextResponse.json(
        { error: `Invalid URL format: ${invalid.join(', ')}` },
        { status: 400 },
      );
    }

    // En serie a propósito: yt-dlp en paralelo dispara rate limits de TikTok.
    const results = [];
    for (const url of urls) {
      try {
        results.push(await transcribeOne(openai, url));
      } catch (error: unknown) {
        const failure = error as { code?: string; message?: string };
        const message = failure.code === 'ENOENT'
          ? 'yt-dlp no está instalado o no está en el PATH del proceso de Next (prueba: brew install yt-dlp).'
          : failure.message || 'Unknown error';
        results.push({ url: cleanTiktokUrl(url), ok: false as const, error: message });
      }
    }

    const recipes = results
      .filter((entry) => entry.ok)
      .map((entry) => (entry as { recipe: unknown }).recipe);
    const failures = results.filter((entry) => !entry.ok) as { url: string; error: string }[];

    // Si TODO falló, es un problema de entorno (yt-dlp, API key, red), no del video.
    // Se devuelve como error para que la UI lo muestre en vez de un `[]` mudo.
    if (!recipes.length) {
      return NextResponse.json(
        {
          error: `No se pudo procesar ninguna URL.\n\n${failures
            .map((entry) => `• ${entry.url}\n  ${entry.error}`)
            .join('\n')}`,
          results,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      results,
      failures,
      // `result` se mantiene para no romper la página actual: JSON listo para pegar.
      result: JSON.stringify(recipes.length === 1 ? recipes[0] : recipes, null, 2),
    });
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
  }
}
