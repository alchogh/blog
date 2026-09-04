export const POST_CATEGORIES = ["typescript", "deep-dive", "react", "tooling", "backend"] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  typescript: "TypeScript",
  "deep-dive": "Deep Dive",
  react: "React",
  tooling: "Tooling",
  backend: "Backend",
};

const AUTHOR_HANDLE = "geonoooo";

const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
};

export const siteConfig = {
  name: AUTHOR_HANDLE,
  title: `${AUTHOR_HANDLE}.dev`,
  description:
    "프론트엔드·인프라 학습 기록. TypeScript, Next.js, React부터 Nginx, AWS, GCP까지 직접 겪으며 정리한 글들을 모읍니다.",
  url: getSiteUrl(),
  author: {
    name: AUTHOR_HANDLE,
    email: `${AUTHOR_HANDLE}.fe@gmail.com`,
  },
  social: {
    github: `https://github.com/alchogh`,
  },
  // 목록이 루트라 별도 Posts 항목이 없다. 로고가 루트로 가는 링크다.
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ],
} as const;
