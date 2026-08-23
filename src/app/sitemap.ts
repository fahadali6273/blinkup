import type { MetadataRoute } from "next";
import { serviceCatalog } from "../data/serviceCatalog";

const siteUrl = "https://blinkuphome.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/amc", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/bhopal", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/lead", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.65, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.65, changeFrequency: "monthly" as const },
    {
      path: "/testimonials",
      priority: 0.55,
      changeFrequency: "monthly" as const,
    },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const serviceRoutes = serviceCatalog.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: service.popular ? 0.85 : 0.75,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceRoutes,
  ];
}
