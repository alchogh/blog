import { defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";

const POST_CATEGORIES = ["typescript", "deep-dive", "react", "tooling", "backend"] as const;

const posts = {
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      summary: s.string().max(240),
      date: s.isodate(),
      category: s.enum(POST_CATEGORIES),
      tags: s.array(s.string()).default([]),
      // 실제 스크린샷·로고를 쓰고 싶은 글만 넣는다. 없으면 자동 커버로 대체.
      thumbnail: s.image().optional(),
      draft: s.boolean().default(false),
      slug: s.path(),
      permalink: s.path(),
      metadata: s.metadata(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug.replace(/^posts\//, ""),
      permalink: `/posts/${data.slug.replace(/^posts\//, "")}`,
    })),
};

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm, remarkAlert],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "vesper",
          keepBackground: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
