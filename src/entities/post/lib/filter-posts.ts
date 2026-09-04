import type { PostCategory } from "@/shared/config";
import type { Post } from "../model";

interface FilterPostsOptions {
  /** 빈 배열이면 카테고리로 거르지 않는다. */
  categories: PostCategory[];
  tag: string | null;
}

export function filterPosts<T extends Pick<Post, "category" | "tags">>(
  posts: T[],
  { categories, tag }: FilterPostsOptions,
): T[] {
  return posts.filter((post) => {
    if (categories.length > 0 && !categories.includes(post.category)) {
      return false;
    }
    if (tag && !post.tags.includes(tag)) {
      return false;
    }
    return true;
  });
}
