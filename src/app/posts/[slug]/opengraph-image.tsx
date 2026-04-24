import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/entities/post";
import { CATEGORY_LABELS, siteConfig } from "@/shared/config";
import { loadOgFont } from "@/shared/lib";

export const alt = "Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const fontData = await loadOgFont();

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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#10b981",
              }}
            />
            <span style={{ fontSize: 26, color: "#9ca3af" }}>
              {siteConfig.title}
            </span>
          </div>
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
            {CATEGORY_LABELS[post.category]}
          </div>
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
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: fontData, style: "normal", weight: 600 },
      ],
    },
  );
}
