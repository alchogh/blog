import type { Metadata } from "next";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author.name}.`,
};

export default function AboutPage() {
  return (
    <Container size="prose">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>About</h1>
        <p>뚝딱뚝딱 공사중</p>
      </article>
    </Container>
  );
}
