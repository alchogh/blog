import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  // 목록은 루트 하나로 합쳤다. 색인돼 있던 옛 주소를 전부 살려서 보낸다.
  // /posts/:slug(글 상세)는 그대로다 — source "/posts"는 정확히 그 경로만 잡는다.
  async redirects() {
    return [
      { source: "/posts", destination: "/", permanent: true },
      {
        source: "/categories/:category",
        destination: "/?category=:category",
        permanent: true,
      },
      { source: "/categories", destination: "/", permanent: true },
      { source: "/tags/:tag", destination: "/?tag=:tag", permanent: true },
    ];
  },
};

export default nextConfig;
