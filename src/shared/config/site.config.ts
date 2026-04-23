export const POST_CATEGORIES = ["typescript", "deep-dive", "react"] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  typescript: "TypeScript",
  "deep-dive": "Deep Dive",
  react: "React",
};

const AUTHOR_HANDLE = "geonoooo";

export const siteConfig = {
  name: AUTHOR_HANDLE,
  title: `${AUTHOR_HANDLE}.dev`,
  description: "A personal blog about TypeScript, deep dives, and React.",
  url: `https://${AUTHOR_HANDLE}.dev`,
  author: {
    name: AUTHOR_HANDLE,
    email: `${AUTHOR_HANDLE}.fe@gmail.com`,
  },
  social: {
    github: `https://github.com/alchogh`,
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Posts" },
    { href: "/about", label: "About" },
  ],
} as const;
