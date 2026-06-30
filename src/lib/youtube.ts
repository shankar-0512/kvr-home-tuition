const YOUTUBE_ID_PATTERN =
  /(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(YOUTUBE_ID_PATTERN);
  if (match) return match[1];

  // Allow a bare 11-character video ID too.
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}
