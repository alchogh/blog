import type { Post } from "../model";
import { PostCategoryBadge } from "./post-category-badge";
import { PostMeta } from "./post-meta";
import { PostTagBadge } from "./post-tag-badge";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-10 flex flex-col gap-4 border-b border-border pb-8">
      <div className="flex items-center gap-2">
        <PostCategoryBadge category={post.category} asLink />
        <PostMeta date={post.date} readingTime={post.metadata.readingTime} />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <p className="text-base text-muted-foreground">{post.summary}</p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {post.tags.map((tag) => (
            <PostTagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </header>
  );
}
