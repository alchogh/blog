import type { Post as VelitePost } from "#content";

export type Post = VelitePost;

export type PostSummary = Omit<Post, "body">;
