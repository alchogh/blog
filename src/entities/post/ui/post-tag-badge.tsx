import Link from "next/link";
import { cn } from "@/shared/lib";

interface PostTagBadgeProps {
  tag: string;
  className?: string;
}

export function PostTagBadge({ tag, className }: PostTagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className={cn(
        "text-xs text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      #{tag}
    </Link>
  );
}
