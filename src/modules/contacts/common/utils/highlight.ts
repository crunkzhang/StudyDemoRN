export interface HitSegment { text: string; hit: boolean; }

export function splitByHit(text: string, keyword: string): HitSegment[] {
  if (!keyword) return [{text, hit: false}];
  const lowerText = text.toLowerCase();
  const lowerKey = keyword.toLowerCase();
  const out: HitSegment[] = [];
  let i = 0;
  while (i < text.length) {
    const idx = lowerText.indexOf(lowerKey, i);
    if (idx === -1) {
      out.push({text: text.slice(i), hit: false});
      break;
    }
    if (idx > i) out.push({text: text.slice(i, idx), hit: false});
    out.push({text: text.slice(idx, idx + keyword.length), hit: true});
    i = idx + keyword.length;
  }
  return out;
}
