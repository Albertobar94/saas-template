import { type MetadataRoute } from "next";
import { env } from "@module/shared/common-env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${env.BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: `${env.BASE_URL}/sign-up`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
  ];
}
