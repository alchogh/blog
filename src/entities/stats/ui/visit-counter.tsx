import { getVisitStats } from "../api";
import type { VisitStats } from "../model";

export async function VisitCounter() {
  let stats: VisitStats | null = null;
  try {
    stats = await getVisitStats();
  } catch {
    return null;
  }

  return (
    <p className="tabular-nums">
      Today {stats.today.toLocaleString()} · Total {stats.total.toLocaleString()}
    </p>
  );
}
