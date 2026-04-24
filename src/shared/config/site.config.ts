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
  description:
    "프론트엔드·인프라 학습 기록. TypeScript, Next.js, React부터 Nginx, AWS, GCP까지 직접 겪으며 정리한 글들을 모읍니다.",
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
