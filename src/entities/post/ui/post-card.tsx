import { Eye } from "lucide-react";
import Link from "next/link";
import type { Post } from "../model";
import { PostCategoryBadge } from "./post-category-badge";
import { PostMeta } from "./post-meta";
import { PostTagBadge } from "./post-tag-badge";

interface PostCardProps {
  post: Post;
  views?: number;
}

export function PostCard({ post, views }: PostCardProps) {
  return (
    <article className="group flex flex-col gap-2 border-b border-border py-6 last:border-b-0">
      <div className="flex items-center gap-2">
        <PostCategoryBadge category={post.category} asLink />
        <PostMeta date={post.date} readingTime={post.metadata.readingTime} />
        {views !== undefined && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
            <Eye className="size-3.5" aria-hidden />
            {views.toLocaleString()}
          </span>
        )}
      </div>
      <Link href={post.permalink} className="mt-1 block">
        <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
          {post.title}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{post.summary}</p>
      </Link>
      {post.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {post.tags.map((tag) => (
            <PostTagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
