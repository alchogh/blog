import type { Metadata } from "next";
import { getAllPosts, PostCategoryFilter, PostList } from "@/entities/post";
import { getPostViews } from "@/entities/stats";
import { Container } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Posts",
  description: "All posts.",
};

export default async function PostsPage() {
  const posts = getAllPosts();
  const views = await getPostViews().catch(() => undefined);

  return (
    <Container size="wide">
      <PostCategoryFilter />
      <PostList posts={posts} views={views} />
    </Container>
  );
}
