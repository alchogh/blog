import type { PostCategory } from "@/shared/config";
import type { Post } from "../model";
import { getAllPosts } from "./get-all-posts";

export function getPostsByCategory(category: PostCategory): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}
