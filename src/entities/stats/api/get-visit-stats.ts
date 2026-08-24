import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/shared/lib/supabase";
import type { VisitStats } from "../model";

export const VISIT_STATS_TAG = "visit-stats";

async function fetchVisitStats(): Promise<VisitStats> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("get_visit_stats");
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  return {
    today: Number(row?.today_count ?? 0),
    total: Number(row?.total_count ?? 0),
  };
}

export const getVisitStats = unstable_cache(fetchVisitStats, ["visit-stats"], {
  revalidate: 60,
  tags: [VISIT_STATS_TAG],
});
