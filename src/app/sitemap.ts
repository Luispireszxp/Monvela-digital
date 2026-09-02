import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.siteUrl}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
