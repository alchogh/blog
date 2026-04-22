import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "../model";

interface PostNavigationProps {
  previous: Post | null;
  next: Post | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {previous ? (
        <Link
          href={previous.permalink}
          className="group flex flex-col gap-1 rounded-md border border-border p-4 transition-colors hover:border-foreground"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <span className="text-sm font-medium">{previous.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={next.permalink}
          className="group flex flex-col gap-1 rounded-md border border-border p-4 text-right transition-colors hover:border-foreground sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium">{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
