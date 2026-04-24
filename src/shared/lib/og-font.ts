const FONT_URL =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-SemiBold.otf";

export async function loadOgFont(): Promise<ArrayBuffer> {
  const res = await fetch(FONT_URL);
  if (!res.ok) {
    throw new Error(`Failed to load OG font: ${res.status} ${res.statusText}`);
  }
  return res.arrayBuffer();
}
