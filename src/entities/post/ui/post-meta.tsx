import { formatDate } from "@/shared/lib";
import type { Post } from "../model";

interface PostMetaProps {
  date: Post["date"];
  readingTime: Post["metadata"]["readingTime"];
}

export function PostMeta({ date, readingTime }: PostMetaProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden>·</span>
      <span>{readingTime} min read</span>
    </div>
  );
}
