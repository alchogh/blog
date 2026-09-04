import type { PostCategory } from "@/shared/config";

/** 목록 카드 커버 모티프. velite.config.ts의 POST_COVERS와 같은 값을 유지한다. */
export const POST_COVERS = [
  "branch",
  "chunks",
  "contrast",
  "counter",
  "envelope",
  "gate",
  "layers",
  "mapping",
  "ports",
  "scroll",
  "swatches",
  "table-vs-doc",
  "terminal",
  "tree",
  "tunnel",
] as const;

export type PostCover = (typeof POST_COVERS)[number];

export type PostSort = "latest" | "views";

export const POST_SORT_OPTIONS: { value: PostSort; label: string }[] = [
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회수순" },
];

export const DEFAULT_POST_SORT: PostSort = "latest";

/** 한 번에 보여주는 글 수. "더 보기"는 이 값의 배수만큼 누적 노출한다. */
export const POSTS_PAGE_SIZE = 8;

export interface PostQuery {
  categories: PostCategory[];
  tag: string | null;
  sort: PostSort;
  page: number;
}
