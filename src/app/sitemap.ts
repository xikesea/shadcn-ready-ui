import { MetadataRoute } from "next";

const BASE_URL = "https://shadcn-ready-ui.vercel.app";

const categories = ["table", "form", "other", "import", "file-manager", "acl"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categories.map((cat) => ({
      url: `${BASE_URL}/?category=${cat}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
