import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  PostBody,
  PostHeader,
  PostNavigation,
} from "@/entities/post";
import { Container } from "@/shared/ui";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
      url: post.permalink,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);

  return (
    <Container size="prose">
      <PostHeader post={post} />
      <PostBody code={post.body} />
      <PostNavigation previous={previous} next={next} />
    </Container>
  );
}
