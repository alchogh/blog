import Link from "next/link";
import {
  CATEGORY_LABELS,
  POST_CATEGORIES,
  type PostCategory,
} from "@/shared/config";
import { cn } from "@/shared/lib";

interface PostCategoryFilterProps {
  active?: PostCategory;
  className?: string;
}

const itemClass = (isActive: boolean) =>
  cn(
    "focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    isActive
      ? "bg-brand-subtle text-brand font-medium"
      : "text-muted-foreground hover:text-foreground hover:bg-muted",
  );

export function PostCategoryFilter({
  active,
  className,
}: PostCategoryFilterProps) {
  return (
    <nav
      aria-label="카테고리로 글 거르기"
      className={cn("-mx-3 flex flex-wrap items-center gap-1", className)}
    >
      <Link
        href="/posts"
        aria-current={!active ? "page" : undefined}
        className={itemClass(!active)}
      >
        전체
      </Link>
      {POST_CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/categories/${category}`}
          aria-current={active === category ? "page" : undefined}
          className={itemClass(active === category)}
        >
          <span
            aria-hidden
            data-category={category}
            className="category-dot size-2 rounded-full"
          />
          {CATEGORY_LABELS[category]}
        </Link>
      ))}
    </nav>
  );
}
