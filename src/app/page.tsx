import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, PostList } from "@/entities/post";
import { Container } from "@/shared/ui";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <Container>
      <section className="pt-6">
        <div className="mb-2 flex items-center justify-between">
          <Link
            href="/posts"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors"
          >
            All posts <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <PostList posts={posts} />
      </section>
    </Container>
  );
}
