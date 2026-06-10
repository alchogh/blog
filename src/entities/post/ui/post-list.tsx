import type { Post } from "../model";
import { PostCard } from "./post-card";

interface PostListProps {
  posts: Post[];
  empty?: string;
  views?: Record<string, number>;
}

export function PostList({
  posts,
  empty = "아직 글이 없습니다.",
  views,
}: PostListProps) {
  if (posts.length === 0) {
    return <p className="py-8 text-sm text-muted-foreground">{empty}</p>;
  }
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          post={post}
          views={views ? (views[post.slug] ?? 0) : undefined}
        />
      ))}
    </div>
  );
}
