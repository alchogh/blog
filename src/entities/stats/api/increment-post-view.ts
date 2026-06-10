import "server-only";
import { getSupabaseAdmin } from "@/shared/lib/supabase";

export async function incrementPostView(slug: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.rpc("increment_post_view", { p_slug: slug });
  if (error) throw error;
}
