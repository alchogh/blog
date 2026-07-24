import type { Post } from "../model";

export function isPublished(post: Pick<Post, "draft">): boolean {
  // dev에서는 미리보기용으로 draft도 노출, 프로덕션 빌드에서만 숨긴다.
  return process.env.NODE_ENV === "development" || !post.draft;
}
