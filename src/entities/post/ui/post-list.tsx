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
    return <p className="text-muted-foreground py-8 text-sm">{empty}</p>;
  }
  return (
    <div className="space-y-12">
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
