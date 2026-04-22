import type { Post } from "../model";
import { getAllPosts } from "./get-all-posts";

export interface AdjacentPosts {
  previous: Post | null;
  next: Post | null;
}

export function getAdjacentPosts(slug: string): AdjacentPosts {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    next: posts[index - 1] ?? null,
    previous: posts[index + 1] ?? null,
  };
}
