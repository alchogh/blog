import type { Metadata } from "next";
import { getAllPosts, PostCategoryFilter, PostList } from "@/entities/post";
import { Container } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Posts",
  description: "All posts.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <PostCategoryFilter />
      <PostList posts={posts} />
    </Container>
  );
}
