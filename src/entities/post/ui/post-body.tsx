import { MDXContent } from "@/shared/mdx";
import type { Post } from "../model";

interface PostBodyProps {
  code: Post["body"];
}

export function PostBody({ code }: PostBodyProps) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-blue-600 prose-a:underline-offset-4 dark:prose-a:text-blue-400 prose-pre:p-0 prose-pre:border-0 prose-pre:bg-transparent">
      <MDXContent code={code} />
    </div>
  );
}
