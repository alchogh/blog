"use client";

import { useEffect } from "react";

interface PostViewTrackerProps {
  slug: string;
}

export function PostViewTracker({ slug }: PostViewTrackerProps) {
  useEffect(() => {
    const sessionKey = `post-view:${slug}`;
    if (sessionStorage.getItem(sessionKey)) return;

    const fire = () => {
      void fetch(`/api/posts/${encodeURIComponent(slug)}/view`, {
        method: "POST",
        keepalive: true,
      })
        .then(() => sessionStorage.setItem(sessionKey, "1"))
        .catch(() => {});
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(fire);
      return () => w.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(fire, 1500);
    return () => window.clearTimeout(id);
  }, [slug]);

  return null;
}
