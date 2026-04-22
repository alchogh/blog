import { POST_CATEGORIES, type PostCategory } from "@/shared/config";
import { getAllPosts } from "./get-all-posts";

export interface CategoryWithCount {
  category: PostCategory;
  count: number;
}

export function getAllCategoriesWithCount(): CategoryWithCount[] {
  const posts = getAllPosts();
  return POST_CATEGORIES.map((category) => ({
    category,
    count: posts.filter((post) => post.category === category).length,
  }));
}
