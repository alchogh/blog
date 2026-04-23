import Link from "next/link";
import {
  CATEGORY_LABELS,
  POST_CATEGORIES,
  type PostCategory,
} from "@/shared/config";
import { cn } from "@/shared/lib";

interface PostCategoryFilterProps {
  active?: PostCategory;
}

export function PostCategoryFilter({ active }: PostCategoryFilterProps) {
  const itemClass = (isActive: boolean) =>
    cn(
      "transition-colors hover:text-foreground",
      isActive ? "font-medium text-foreground" : "text-muted-foreground",
    );

  return (
    <nav
      aria-label="Filter posts by category"
      className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-8 text-sm"
    >
      <Link href="/posts" className={itemClass(!active)}>
        All
      </Link>
      {POST_CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/categories/${category}`}
          className={itemClass(active === category)}
        >
          {CATEGORY_LABELS[category]}
        </Link>
      ))}
    </nav>
  );
}
