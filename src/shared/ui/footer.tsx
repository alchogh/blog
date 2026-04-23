import { siteConfig } from "@/shared/config";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-8">
      <Container
        size="wide"
        className="flex flex-col items-center gap-3 text-xs text-muted-foreground"
      >
        <nav className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a href="/rss.xml" className="hover:text-foreground transition-colors">
            RSS
          </a>
        </nav>
        <p>
          © {new Date().getFullYear()} {siteConfig.author.name}
        </p>
      </Container>
    </footer>
  );
}
