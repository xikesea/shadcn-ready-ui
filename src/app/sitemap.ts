import { MetadataRoute } from "next";

const BASE_URL = "https://shadcn-ready-ui.vercel.app";

const routes = ["/", "/form", "/auth", "/import", "/file-manager", "/acl"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
