import { incrementVisit } from "@/entities/stats";

const BOT_PATTERN =
  /bot|crawler|spider|crawling|preview|fetch|monitor|headless|lighthouse|pingdom|slurp|baiduspider/i;

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "production") {
    return new Response(null, { status: 204 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_PATTERN.test(ua)) {
    return new Response(null, { status: 204 });
  }

  try {
    await incrementVisit();
  } catch {
    // visit count is best-effort; never surface failure to the client
  }

  return new Response(null, { status: 204 });
}
