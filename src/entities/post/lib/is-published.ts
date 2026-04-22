import type { Post } from "../model";

export function isPublished(post: Pick<Post, "draft">): boolean {
  return !post.draft;
}
