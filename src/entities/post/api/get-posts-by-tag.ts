import type { Post } from "../model";
import { getAllPosts } from "./get-all-posts";

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
