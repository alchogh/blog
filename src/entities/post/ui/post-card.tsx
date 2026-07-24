import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "../model";
import { PostCategoryBadge } from "./post-category-badge";
import { PostMeta } from "./post-meta";

interface PostCardProps {
  post: Post;
  views?: number;
}

export function PostCard({ post, views }: PostCardProps) {
  // frontmatter thumbnail이 있으면 그 이미지를, 없으면 카테고리 자동 커버를 쓴다.
  const thumbnail = post.thumbnail;
  const src = thumbnail?.src ?? `/posts/${post.slug}/thumbnail`;

  return (
    <article className="group flex flex-col gap-3">
      <Link
        href={post.permalink}
        aria-hidden
        tabIndex={-1}
        className="relative block aspect-16/10 overflow-hidden rounded-xl border border-border"
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          {...(thumbnail?.blurDataURL
            ? { placeholder: "blur" as const, blurDataURL: thumbnail.blurDataURL }
            : {})}
        />
      </Link>

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

      <Link href={post.permalink} className="block">
        <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
          {post.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
          {post.summary}
        </p>
      </Link>
    </article>
  );
}
