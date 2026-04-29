import { giscusConfig, isGiscusConfigured } from "@/shared/config";
import { Giscus } from "@/shared/ui";

interface PostCommentsProps {
  slug: string;
}

export function PostComments({ slug }: PostCommentsProps) {
  if (!isGiscusConfigured) return null;

  return (
    <section
      id="comments"
      className="mt-16 border-t border-border pt-8"
    >
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Comments
      </h2>
      <Giscus {...giscusConfig} mapping="specific" term={slug} />
    </section>
  );
}
