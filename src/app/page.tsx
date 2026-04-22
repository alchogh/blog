import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, PostList } from "@/entities/post";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui";

const RECENT_POST_LIMIT = 5;

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, RECENT_POST_LIMIT);

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
        <PostList posts={recentPosts} />
      </section>
    </Container>
  );
}
