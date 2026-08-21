"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib";
import type { Post } from "../model";

type TocItem = Post["toc"][number];

interface PostTocProps {
  toc: Post["toc"];
}

function flatten(items: TocItem[], depth = 0): { url: string; title: string; depth: number }[] {
  return items.flatMap((item) => [
    { url: item.url, title: item.title, depth },
    ...flatten(item.items ?? [], depth + 1),
  ]);
}

// 현재 화면에 보이는 heading을 활성 표시한다. 위쪽에 걸린 것 중 마지막을 고른다.
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const update = () => {
      const OFFSET = 96; // sticky 헤더 높이 + 여유
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = id;
      }
      setActive(current ?? ids[0]);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids]);

  return active;
}

export function PostToc({ toc }: PostTocProps) {
  const items = flatten(toc);
  const active = useActiveHeading(items.map((item) => decodeURIComponent(item.url.slice(1))));

  if (items.length < 3) return null;

  return (
    <nav aria-label="목차" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.14em] uppercase">
        목차
      </p>
      <ul className="border-border space-y-1.5 border-l">
        {items.map((item) => {
          const id = decodeURIComponent(item.url.slice(1));
          const isActive = active === id;
          return (
            <li key={item.url}>
              <a
                href={item.url}
                className={cn(
                  "focus-visible:ring-ring line-clamp-2 block border-l py-0.5 pr-2 text-[13px] leading-snug transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  item.depth === 0 ? "pl-3" : "pl-6",
                  isActive
                    ? "border-brand text-foreground -ml-px font-medium"
                    : "text-muted-foreground hover:text-foreground border-transparent",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
