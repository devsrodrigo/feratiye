export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => [] as number[]);

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function hasExactQuery(fields: string[], query: string): boolean {
  return fields.some((field) => field.includes(query));
}

function tokenMatchScore(fields: string[], tokens: string[]): number | null {
  if (!tokens.length) {
    return null;
  }

  let totalDistance = 0;

  for (const token of tokens) {
    let tokenMatched = false;

    for (const field of fields) {
      const words = field.split(' ');
      for (const word of words) {
        if (word.startsWith(token) || token.startsWith(word)) {
          tokenMatched = true;
          break;
        }

        const threshold = token.length <= 2 ? 0 : Math.max(1, Math.floor(Math.min(word.length, token.length) * 0.15));
        const distance = levenshteinDistance(word, token);
        if (distance <= threshold) {
          totalDistance += distance;
          tokenMatched = true;
          break;
        }
      }

      if (tokenMatched) {
        break;
      }
    }

    if (!tokenMatched) {
      return null;
    }
  }

  return totalDistance;
}

export function fuzzySearchItems<T>(
  items: T[],
  query: string,
  getSearchFields: (item: T) => string[],
): T[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return items;
  }

  const tokens = normalizedQuery.split(' ').filter(Boolean);

  const matches = items
    .map((item) => {
      const fields = getSearchFields(item).map(normalizeSearchText).filter(Boolean);
      const score = hasExactQuery(fields, normalizedQuery)
        ? 0
        : tokenMatchScore(fields, tokens);

      return score === null ? null : { item, score };
    })
    .filter((entry): entry is { item: T; score: number } => entry !== null)
    .sort((left, right) => left.score - right.score)
    .map((entry) => entry.item);

  return matches;
}
