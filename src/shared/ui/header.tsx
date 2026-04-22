import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { Container } from "./container";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.3-.52-1.47.11-3.07 0 0 .97-.31 3.19 1.18a11.03 11.03 0 0 1 5.81 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.77.11 3.07.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.14 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const LEFT_NAV_HREFS = new Set(["/about"]);
const EXCLUDED_FROM_RIGHT = new Set(["/", "/about"]);

export function Header() {
  const leftItems = siteConfig.nav.filter((item) => LEFT_NAV_HREFS.has(item.href));
  const rightItems = siteConfig.nav.filter((item) => !EXCLUDED_FROM_RIGHT.has(item.href));

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <Container size="wide" className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="transition-colors hover:text-muted-foreground"
          >
            <Logo />
          </Link>
          <ul className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            {leftItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <nav className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            {rightItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
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
