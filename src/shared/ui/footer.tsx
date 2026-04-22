import { siteConfig } from "@/shared/config";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-8">
      <Container
        size="wide"
        className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row"
      >
        <p>
          © {new Date().getFullYear()} {siteConfig.author.name}
        </p>
        <p>Built with Next.js, Velite, and Pretendard.</p>
      </Container>
    </footer>
  );
}
