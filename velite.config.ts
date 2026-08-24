import { defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import { bundledThemes } from "shiki";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";

// github-dark의 주석 색 #6a737d은 이 테마 배경 #24292e 대비 3.05:1로 WCAG AA(4.5:1)에도
// 못 미친다. 다른 토큰은 전부 통과하므로 주석 색만 올린다.
// #b1bac4는 7.47:1로 AAA를 넘기면서, 본문 코드(#e1e4e8, 11.5:1)보다는 어두워 위계가 남는다.
// 주석만으로 이뤄진 코드 블록도 읽히게 하려면 AA로는 부족하다.
const COMMENT_FOREGROUND = "#b1bac4";

const githubDark = (await bundledThemes["github-dark"]()).default;

const codeTheme = {
  ...githubDark,
  tokenColors: githubDark.tokenColors?.map((rule) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
    if (!scopes.includes("comment")) return rule;
    return { ...rule, settings: { ...rule.settings, foreground: COMMENT_FOREGROUND } };
  }),
};

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
      // 본문 목차. rehype-slug가 붙이는 id와 같은 규칙으로 생성된다.
      toc: s.toc({ maxDepth: 3 }),
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
          theme: codeTheme,
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
