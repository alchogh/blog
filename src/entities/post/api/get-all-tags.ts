import { getAllPosts } from "./get-all-posts";

export interface TagWithCount {
  tag: string;
  count: number;
}

export function getAllTagsWithCount(): TagWithCount[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count,
  );
}
