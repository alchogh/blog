import { MDXContent } from "@/shared/mdx";
import type { Post } from "../model";

interface PostBodyProps {
  code: Post["body"];
}

// prose-lg = 본문 18px / 행간 32px / h2 30px·위 여백 56px.
// 색은 globals.css의 .prose에서 토큰에 연결돼 있다.
export function PostBody({ code }: PostBodyProps) {
  return (
    <div className="prose prose-lg prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-a:font-normal prose-a:underline-offset-4 prose-pre:border-0 prose-pre:bg-transparent prose-pre:p-0 max-w-none">
      <MDXContent code={code} />
    </div>
  );
}
