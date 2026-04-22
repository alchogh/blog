import { posts } from "#content";
import type { Post } from "../model";
import { isPublished, sortByDateDesc } from "../lib";

export function getAllPosts(): Post[] {
  return sortByDateDesc(posts.filter(isPublished));
}
