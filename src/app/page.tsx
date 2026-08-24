import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, PostCategoryFilter, PostList } from "@/entities/post";
import { getPostViews } from "@/entities/stats";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui";

const RECENT_COUNT = 5;

export default async function HomePage() {
  const posts = getAllPosts();
  const views = await getPostViews().catch(() => undefined);

  return (
    <Container size="wide">
      <section>
        <p className="text-muted-foreground flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px]">
          <span>프론트엔드 개발자 {siteConfig.author.name}</span>
          <span aria-hidden>·</span>
          <Link
            href="/about"
            className="text-brand hover:text-brand-hover focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            소개
          </Link>
          <span aria-hidden>·</span>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            GitHub
          </a>
        </p>
      </section>

      <PostCategoryFilter className="border-border mt-7 border-b pb-5" />

      <section className="mt-12">
        <PostList posts={posts.slice(0, RECENT_COUNT)} views={views} />
        {posts.length > RECENT_COUNT && (
          <Link
            href="/posts"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background mt-12 inline-flex items-center gap-1.5 rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            전체 글 {posts.length}개 보기
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        )}
      </section>
    </Container>
  );
}
