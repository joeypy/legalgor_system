import type { MetadataRoute } from "next";

import { registrationPackages } from "@/features/servicios/data";

const siteUrl = "https://grupolegalgor.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const packageUrls = registrationPackages.map((pkg) => ({
    url: `${siteUrl}/paquetes/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...packageUrls,
  ];
}
