export function limitReviewText(text: string, maxLength: number) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const truncated = normalized.slice(0, maxLength).replace(/\s+\S*$/, "");
  return `${truncated || normalized.slice(0, maxLength).trim()}...`;
}
