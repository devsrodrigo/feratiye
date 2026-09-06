/**
 * Búsqueda del sitio.
 *
 * Reglas de diseño (a propósito, estrictas):
 *  - Solo se busca por TÍTULO y CATEGORÍA. Nunca por descripción ni por
 *    ingredientes: eso era lo que hacía que "salsa" devolviera media web.
 *  - Insensible a acentos, mayúsculas y puntuación ("jalapeno" = "jalapeño").
 *  - Tolera ~1 error de dedo por palabra (2 en palabras largas).
 *  - Semántica AND: todas las palabras significativas de la consulta deben
 *    encontrarse. Si una no aparece, la receta no es resultado.
 */

export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/** Palabras de unión: ayudan a ordenar, pero no se exigen para hacer match. */
const STOP_WORDS = new Set([
  'a', 'al', 'con', 'de', 'del', 'e', 'el', 'en', 'la', 'las', 'lo', 'los',
  'o', 'para', 'por', 'sin', 'su', 'un', 'una', 'y',
]);

/** Distancia de Levenshtein con corte temprano: si supera max, devuelve max + 1. */
function boundedLevenshtein(a: string, b: string, max: number): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMin = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      current[j] = value;
      if (value < rowMin) rowMin = value;
    }

    if (rowMin > max) return max + 1;
    previous = current;
  }

  return previous[b.length];
}

/** Cuántos errores de dedo se permiten según el largo de la palabra buscada. */
function typoBudget(token: string): number {
  if (token.length <= 3) return 0;
  if (token.length <= 7) return 1;
  return 2;
}

/**
 * Intenta casar una palabra de la consulta contra las palabras del texto.
 * Devuelve un costo (menor = mejor) o null si no hay match.
 */
function scoreToken(words: string[], token: string): number | null {
  let best: number | null = null;

  const consider = (cost: number) => {
    if (best === null || cost < best) best = cost;
  };

  for (const word of words) {
    if (word === token) {
      consider(0);
      break;
    }

    // Prefijo: "chipo" encuentra "chipotle". Se pide un mínimo de 3 letras
    // para que "a" o "de" no abran la búsqueda entera.
    if (token.length >= 3 && word.startsWith(token)) {
      consider(0.25);
      continue;
    }

    const budget = typoBudget(token);
    if (budget > 0) {
      const distance = boundedLevenshtein(word, token, budget);
      if (distance <= budget) consider(distance);
    }
  }

  return best;
}

export interface SearchableFields {
  /** Texto principal: título de la receta o nombre del producto. */
  title: string;
  /** Texto secundario opcional: categoría. */
  category?: string;
}

function scoreItem(fields: SearchableFields, query: string): number | null {
  const title = normalizeSearchText(fields.title);
  const category = normalizeSearchText(fields.category ?? '');

  // Coincidencias literales primero: son las que el usuario espera arriba.
  if (title === query) return -100;
  if (title.startsWith(query)) return -50 + title.length / 1000;
  // El "contiene" suelto solo aplica desde 3 letras: con menos, "x" encontraría
  // "Mexicana" y volveríamos al problema de que la búsqueda muerde todo.
  if (query.length >= 3 && title.includes(query)) return -25 + title.length / 1000;
  if (category && (category === query || category.startsWith(query))) return -10;
  if (category && query.length >= 3 && category.includes(query)) return -5;

  const words = [...title.split(' '), ...category.split(' ')].filter(Boolean);
  const tokens = query.split(' ').filter(Boolean);
  // Se exigen las palabras con contenido. Las de 1-2 letras se ignoran: casi
  // siempre son conectores mal escritos ("arroz cn leche") y no aportan.
  const meaningful = tokens.filter((token) => token.length >= 3 && !STOP_WORDS.has(token));

  // Consulta hecha solo de conectores ("de la"): sin coincidencia literal, no hay match.
  if (!meaningful.length) return null;

  let total = 0;
  for (const token of meaningful) {
    const cost = scoreToken(words, token);
    if (cost === null) return null;
    total += cost;
  }

  // A igualdad de costo, gana el título más corto (más específico).
  return total + title.length / 1000;
}

export function searchItems<T>(
  items: T[],
  query: string,
  getFields: (item: T) => SearchableFields,
): T[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return items;

  return items
    .map((item) => ({ item, score: scoreItem(getFields(item), normalizedQuery) }))
    .filter((entry): entry is { item: T; score: number } => entry.score !== null)
    .sort((left, right) => left.score - right.score)
    .map((entry) => entry.item);
}

/**
 * @deprecated Se mantiene por compatibilidad. Usa `searchItems`, que solo
 * mira título y categoría. Esta versión toma el primer campo como título y
 * el segundo como categoría, e ignora el resto.
 */
export function fuzzySearchItems<T>(
  items: T[],
  query: string,
  getSearchFields: (item: T) => string[],
): T[] {
  return searchItems(items, query, (item) => {
    const [title = '', category = ''] = getSearchFields(item);
    return { title, category };
  });
}
