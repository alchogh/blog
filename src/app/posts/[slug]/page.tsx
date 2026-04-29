import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  PostBody,
  PostComments,
  PostHeader,
  PostNavigation,
} from "@/entities/post";
import { siteConfig } from "@/shared/config";
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
    keywords: post.tags,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    alternates: {
      canonical: post.permalink,
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      title: post.title,
      description: post.summary,
      url: post.permalink,
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(slug);

  const postUrl = `${siteConfig.url}${post.permalink}`;
  const ogImageUrl = `${postUrl}/opengraph-image`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    image: ogImageUrl,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "ko-KR",
  };

  return (
    <Container size="prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostHeader post={post} />
      <PostBody code={post.body} />
      <PostComments slug={slug} />
      <PostNavigation previous={previous} next={next} />
    </Container>
  );
}
