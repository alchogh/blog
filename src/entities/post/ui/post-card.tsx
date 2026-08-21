import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/shared/lib";
import type { Post } from "../model";
import { PostCategoryBadge } from "./post-category-badge";

interface PostCardProps {
  post: Post;
  views?: number;
}

export function PostCard({ post, views }: PostCardProps) {
  const { thumbnail } = post;

  return (
    <article className="group relative flex gap-6">
      <div className="min-w-0 flex-1">
        <Link
          href={post.permalink}
          className="focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          {/* 카드 전체를 클릭 영역으로. 배지 링크는 z-10으로 위에 둔다. */}
          <span className="absolute inset-0" aria-hidden />
          <h2 className="group-hover:text-brand text-xl leading-snug font-bold tracking-tight transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-muted-foreground mt-2.5 line-clamp-2 max-w-2xl text-[15px] leading-relaxed">
          {post.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <PostCategoryBadge
            category={post.category}
            asLink
            className="relative z-10"
          />
          <time dateTime={post.date} className="text-muted-foreground text-sm">
            {formatDate(post.date)}
          </time>
          {views !== undefined && (
            <span className="text-muted-foreground flex items-center gap-1 text-sm tabular-nums">
              <Eye className="size-3.5" aria-hidden />
              {views.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* 썸네일은 frontmatter에 있는 글만. 우측에 두는 이유: 이미지가 있는 글과
          없는 글이 섞여도 제목 시작 위치가 흔들리지 않는다. */}
      {thumbnail && (
        <div className="border-border relative hidden aspect-square w-[184px] shrink-0 overflow-hidden rounded-xl border sm:block">
          <Image
            src={thumbnail.src}
            alt=""
            fill
            sizes="184px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            {...(thumbnail.blurDataURL
              ? {
                  placeholder: "blur" as const,
                  blurDataURL: thumbnail.blurDataURL,
                }
              : {})}
          />
        </div>
      )}
    </article>
  );
}
