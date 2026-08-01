export const unsupportedPhrases = [
  "best",
  "number one",
  "#1",
  "top-rated",
  "lowest price",
  "free estimate",
  "free inspection",
  "free roof",
  "free replacement",
  "same-day",
  "24/7",
  "emergency",
  "emergency tarping",
  "guaranteed response",
  "lifetime roof",
  "lifetime warranty",
  "insurance will pay",
  "no out-of-pocket",
  "cover your deductible",
  "licensed",
  "insured",
  "bonded",
  "certified",
  "financing available",
  "commercial roofing",
] as const;

const placeholderPattern = /\[[^\]\r\n]+\]/g;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function findUnsupportedContent(content: string): string[] {
  const phraseMatches = unsupportedPhrases.filter((phrase) => {
    const pattern = new RegExp(
      `(?<![A-Za-z0-9])${escapeRegExp(phrase)}(?![A-Za-z0-9])`,
      "i",
    );

    return pattern.test(content);
  });
  const placeholders = content.match(placeholderPattern) ?? [];

  return [...phraseMatches, ...placeholders];
}
