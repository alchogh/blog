import {
  createPostThumbnailImage,
  getAllPosts,
  getPostBySlug,
} from "@/entities/post";

// 카드 썸네일은 안정적인 URL(/posts/{slug}/thumbnail)이 필요하다.
// opengraph-image의 URL은 해시가 붙어 컴포넌트에서 참조하기 어렵다.
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return createPostThumbnailImage(post);
}
