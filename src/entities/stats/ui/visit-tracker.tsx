"use client";

import { useEffect } from "react";

const SESSION_KEY = "visit-tracked";

export function VisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const fire = () => {
      void fetch("/api/visit", { method: "POST", keepalive: true })
        .then(() => sessionStorage.setItem(SESSION_KEY, "1"))
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
  }, []);

  return null;
}
