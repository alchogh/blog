import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { Container } from "./container";
import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const EXCLUDED_FROM_RIGHT = new Set(["/"]);

export function Header() {
  const rightItems = siteConfig.nav.filter((item) => !EXCLUDED_FROM_RIGHT.has(item.href));

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <Container size="wide" className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-muted-foreground transition-colors">
            <Logo />
          </Link>
        </div>
        <nav className="flex items-center gap-5">
          <ul className="text-muted-foreground hidden items-center gap-5 text-sm sm:flex">
            {rightItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="border-border text-muted-foreground hover:text-foreground flex h-7 w-7 items-center justify-center rounded-full border transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
          </a>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
