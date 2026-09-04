import { POST_CATEGORIES, type PostCategory } from "@/shared/config";
import { DEFAULT_POST_SORT, type PostQuery, type PostSort } from "../model";

type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isCategory(value: string): value is PostCategory {
  return (POST_CATEGORIES as readonly string[]).includes(value);
}

function isSort(value: string): value is PostSort {
  return value === "latest" || value === "views";
}

/**
 * URL 쿼리를 목록 상태로 정규화한다.
 * 모르는 값은 404가 아니라 기본값으로 떨어뜨린다 — 링크가 썩어도 목록은 보여야 한다.
 */
export function parsePostQuery(params: RawSearchParams): PostQuery {
  const rawCategories = first(params.category) ?? "";
  const categories = rawCategories
    .split(",")
    .map((value) => value.trim())
    .filter(isCategory);

  const rawTag = first(params.tag)?.trim();
  const rawSort = first(params.sort);
  const rawPage = Number(first(params.page));

  return {
    // 같은 카테고리를 두 번 적어도 칩이 두 번 켜지지 않게 중복을 없앤다.
    categories: [...new Set(categories)],
    tag: rawTag ? rawTag : null,
    sort: rawSort && isSort(rawSort) ? rawSort : DEFAULT_POST_SORT,
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
  };
}
