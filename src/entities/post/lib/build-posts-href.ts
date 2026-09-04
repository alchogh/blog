import { DEFAULT_POST_SORT, type PostQuery } from "../model";

/** 글 목록은 루트다. /posts는 여기로 리다이렉트된다. */
export const POSTS_PATH = "/";

/**
 * 목록 상태 → 링크. 서버가 그리는 링크와 클라이언트 컨트롤이 같은 함수를 쓴다.
 * 기본값은 쿼리에 남기지 않는다 — 필터를 다 끄면 주소가 루트로 돌아온다.
 */
export function buildPostsHref(query: Partial<PostQuery>): string {
  const params = new URLSearchParams();

  if (query.categories?.length) {
    params.set("category", query.categories.join(","));
  }
  if (query.tag) {
    params.set("tag", query.tag);
  }
  if (query.sort && query.sort !== DEFAULT_POST_SORT) {
    params.set("sort", query.sort);
  }
  if (query.page && query.page > 1) {
    params.set("page", String(query.page));
  }

  const search = params.toString();
  return search ? `${POSTS_PATH}?${search}` : POSTS_PATH;
}

/** 카테고리 칩 하나를 켜고 끈다. 다른 조건은 유지하되 페이지는 1로 되돌린다. */
export function toggleCategoryHref(
  query: PostQuery,
  category: PostQuery["categories"][number],
): string {
  const categories = query.categories.includes(category)
    ? query.categories.filter((item) => item !== category)
    : [...query.categories, category];

  return buildPostsHref({ ...query, categories, page: 1 });
}
