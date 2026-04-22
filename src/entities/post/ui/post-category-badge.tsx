import Link from "next/link";
import { CATEGORY_LABELS, type PostCategory } from "@/shared/config";
import { cn } from "@/shared/lib";

interface PostCategoryBadgeProps {
  category: PostCategory;
  asLink?: boolean;
  className?: string;
}

export function PostCategoryBadge({
  category,
  asLink = false,
  className,
}: PostCategoryBadgeProps) {
  const classes = cn(
    "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
    asLink && "transition-colors hover:border-foreground hover:text-foreground",
    className,
  );
  const label = CATEGORY_LABELS[category];

  if (asLink) {
    return (
      <Link href={`/categories/${category}`} className={classes}>
        {label}
      </Link>
    );
  }
  return <span className={classes}>{label}</span>;
}
