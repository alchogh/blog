import type { Post as VelitePost } from "#content";

export type Post = VelitePost;

/**
 * 목록에 넘기는 글. 페이로드에 실을 필요가 없는 세 가지를 뺀다.
 * - body: 컴파일된 MDX 문자열. 글 하나가 수십 KB다.
 * - toc: 상세 페이지 목차 전용.
 * - thumbnail: blurDataURL이 base64라 크고, 목록 카드는 SVG 커버를 쓴다.
 */
export type PostListItem = Omit<Post, "body" | "toc" | "thumbnail">;
