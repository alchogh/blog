import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllTagsWithCount,
  getPostsByTag,
  PostList,
} from "@/entities/post";
import { getPostViews } from "@/entities/stats";
import { Container } from "@/shared/ui";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTagsWithCount().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Posts tagged with #${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  const views = await getPostViews().catch(() => undefined);

  return (
    <Container size="wide">
      <div className="pb-8">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Tag
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">#{tag}</h1>
      </div>
      <PostList posts={posts} views={views} />
    </Container>
  );
}
