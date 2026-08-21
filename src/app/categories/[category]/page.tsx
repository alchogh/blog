import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, PostCategoryFilter, PostList } from "@/entities/post";
import { getPostViews } from "@/entities/stats";
import {
  CATEGORY_LABELS,
  POST_CATEGORIES,
  type PostCategory,
} from "@/shared/config";
import { Container } from "@/shared/ui";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

function isCategory(value: string): value is PostCategory {
  return (POST_CATEGORIES as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return POST_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  return {
    title: CATEGORY_LABELS[category],
    description: `Posts in ${CATEGORY_LABELS[category]}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const posts = getPostsByCategory(category);
  const views = await getPostViews().catch(() => undefined);

  return (
    <Container size="wide">
      <PostCategoryFilter active={category} className="border-border mb-10 border-b pb-5" />
      <PostList
        posts={posts}
        views={views}
       
        empty={`${CATEGORY_LABELS[category]} 카테고리에 아직 글이 없습니다.`}
      />
    </Container>
  );
}
