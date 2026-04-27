import "server-only";
import { getSupabaseAdmin } from "@/shared/lib/supabase";

export async function incrementVisit(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.rpc("increment_visit");
  if (error) throw error;
}
