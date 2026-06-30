import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export type Video = {
  id: string;
  created_at: string;
  youtube_id: string;
  title: string;
  featured: boolean;
  sort_order: number;
  standards: string[];
};

// Cache videos for 1 hour. Invalidated immediately when admin adds/deletes/features
// a video via revalidatePath() in the admin routes.
export const getVideos = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data } = await supabase
      .from("videos")
      .select("id, created_at, youtube_id, title, featured, sort_order, standards")
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    return (data ?? []) as Video[];
  },
  ["videos-list"],
  { revalidate: 3600 }
);
