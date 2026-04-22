import type { Metadata } from "next";
import Link from "next/link";
import { getAllCategoriesWithCount } from "@/entities/post";
import { CATEGORY_LABELS } from "@/shared/config";
import { Container } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse posts by category.",
};

export default function CategoriesPage() {
  const categories = getAllCategoriesWithCount();

  return (
    <Container>
      <h1 className="pb-8 text-2xl font-semibold tracking-tight">Categories</h1>
      <ul className="divide-y divide-border border-y border-border">
        {categories.map(({ category, count }) => (
          <li key={category}>
            <Link
              href={`/categories/${category}`}
              className="flex items-center justify-between py-4 transition-colors hover:text-muted-foreground"
            >
              <span className="text-base font-medium">
                {CATEGORY_LABELS[category]}
              </span>
              <span className="text-xs text-muted-foreground">
                {count} {count === 1 ? "post" : "posts"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
