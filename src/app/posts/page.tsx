import type { Metadata } from "next";
import { getAllPosts, PostList } from "@/entities/post";
import { Container } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Posts",
  description: "All posts.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <h1 className="pb-8 text-2xl font-semibold tracking-tight">Posts</h1>
      <PostList posts={posts} />
    </Container>
  );
}
