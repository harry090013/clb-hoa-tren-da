import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { stories } from "@/data/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hoatrenda.org";

  const staticRoutes = [
    "",
    "/ve-chung-toi",
    "/hoat-dong",
    "/du-an",
    "/hanh-trinh",
    "/minh-bach",
    "/dong-hanh",
    "/lien-he",
    "/legal/privacy",
    "/legal/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/du-an/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const storyRoutes = stories.map((s) => ({
    url: `${baseUrl}/hanh-trinh/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...storyRoutes];
}
