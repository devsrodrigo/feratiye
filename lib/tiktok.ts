/**
 * Limpia una URL de TikTok dejando solo la parte canónica del video.
 *
 * Al copiar un link desde la app, TikTok añade parámetros de rastreo
 * (`_t`, `_r`, `is_from_webapp`, `sender_device`, ...) que identifican
 * a quién lo compartió. Nada de eso debe terminar guardado en el sitio.
 *
 *   https://www.tiktok.com/@fernandoatiye/video/123?_t=ZS-1&_r=1
 *     -> https://www.tiktok.com/@fernandoatiye/video/123
 */
export function cleanTiktokUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return trimmed;
  }

  if (!/(^|\.)tiktok\.com$/.test(parsed.hostname)) {
    return trimmed;
  }

  // Links largos: /@usuario/video/<id> — todo lo demás sobra.
  const longForm = parsed.pathname.match(/^\/(@[^/]+)\/video\/(\d+)/);
  if (longForm) {
    return `https://www.tiktok.com/${longForm[1]}/video/${longForm[2]}`;
  }

  // Links cortos (vm./vt.tiktok.com/XXXX): se conserva la ruta, se tira el query.
  return `${parsed.origin}${parsed.pathname.replace(/\/+$/, '')}`;
}
