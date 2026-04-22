import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllTagsWithCount,
} from "@/entities/post";
import { POST_CATEGORIES, siteConfig } from "@/shared/config";

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, priority: 1 },
    { url: `${baseUrl}/posts`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: now, priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.4 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}${post.permalink}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = POST_CATEGORIES.map(
    (category) => ({
      url: `${baseUrl}/categories/${category}`,
      lastModified: now,
      priority: 0.5,
    }),
  );

  const tagRoutes: MetadataRoute.Sitemap = getAllTagsWithCount().map(
    ({ tag }) => ({
      url: `${baseUrl}/tags/${tag}`,
      lastModified: now,
      priority: 0.3,
    }),
  );

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}
