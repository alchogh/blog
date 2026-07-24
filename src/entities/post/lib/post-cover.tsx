import { ImageResponse } from "next/og";
import { CATEGORY_LABELS, type PostCategory, siteConfig } from "@/shared/config";
import { loadOgFont } from "@/shared/lib";
import type { Post } from "../model";

export const POST_COVER_SIZE = { width: 1200, height: 630 };
export const POST_COVER_CONTENT_TYPE = "image/png";

// 카테고리별 강조색. 생성 이미지 내부 색이라 globals.css 토큰이 아닌 hex를 쓴다.
const CATEGORY_ACCENT: Record<PostCategory, string> = {
  typescript: "#3178c6",
  "deep-dive": "#a855f7",
  react: "#38bdf8",
  tooling: "#f59e0b",
  backend: "#10b981",
};

function SiteMark({ accent }: { accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{ width: 14, height: 14, borderRadius: 999, background: accent }}
      />
      <span style={{ fontSize: 28, color: "#9ca3af" }}>{siteConfig.title}</span>
    </div>
  );
}

function CategoryPill({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 18px",
        borderRadius: 999,
        border: "1px solid #374151",
        fontSize: 22,
        color: "#d1d5db",
      }}
    >
      {label}
    </div>
  );
}

async function fontOptions() {
  const fontData = await loadOgFont();
  return {
    ...POST_COVER_SIZE,
    fonts: [
      {
        name: "Pretendard",
        data: fontData,
        style: "normal" as const,
        weight: 600 as const,
      },
    ],
  };
}

// 소셜 공유용(OG). 제목·요약·날짜까지 담아 미리보기에서 맥락이 보이게 한다.
export async function createPostCoverImage(post: Post): Promise<ImageResponse> {
  const options = await fontOptions();
  const accent = CATEGORY_ACCENT[post.category];

  const date = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #1f2937 100%)",
          color: "#ffffff",
          fontFamily: "Pretendard",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SiteMark accent={accent} />
          <CategoryPill label={CATEGORY_LABELS[post.category]} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#d1d5db",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#9ca3af",
          }}
        >
          <span>{siteConfig.author.name}</span>
          <span>{date}</span>
        </div>
      </div>
    ),
    options,
  );
}

// 카테고리별 라인 아이콘. lucide 경로를 직접 인라인해 satori에서 안전하게 그린다.
function CategoryGlyph({
  category,
  color,
  size,
}: {
  category: PostCategory;
  color: string;
  size: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (category) {
    case "backend":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      );
    case "react":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1" />
          <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
          <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
        </svg>
      );
    case "typescript":
      return (
        <svg {...common}>
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
          <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
        </svg>
      );
    case "tooling":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "deep-dive":
      return (
        <svg {...common}>
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </svg>
      );
  }
}

// 목록 카드용 자동 커버. 카드에 제목이 이미 있으니 이미지엔 글자를 넣지 않고
// 카테고리 색 + 아이콘만으로 서로 달라 보이게 한다. (frontmatter thumbnail이
// 있으면 카드가 이 이미지 대신 그 이미지를 쓴다.)
export async function createPostThumbnailImage(
  post: Post,
): Promise<ImageResponse> {
  const options = await fontOptions();
  const accent = CATEGORY_ACCENT[post.category];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#0b0f17",
          backgroundImage: `radial-gradient(650px 650px at 50% 45%, ${accent}30, transparent 70%)`,
          fontFamily: "Pretendard",
        }}
      >
        <CategoryGlyph category={post.category} color={accent} size={240} />
      </div>
    ),
    options,
  );
}
