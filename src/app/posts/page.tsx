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
      <PostCategoryFilter active="all" className="border-border mb-10 border-b pb-5" />
      <PostList posts={posts} views={views} />
    </Container>
  );
}
