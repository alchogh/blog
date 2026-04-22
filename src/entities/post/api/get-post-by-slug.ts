import type { Post } from "../model";
import { getAllPosts } from "./get-all-posts";

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
