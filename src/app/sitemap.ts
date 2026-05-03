import type { MetadataRoute } from "next";
import { getCarsForSitemap } from "@/lib/cars";
import { createCarSlug, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/ponuka", "/dovoz", "/leasing", "/vykup", "/pzp", "/kontakt", "/ochrana-osobnych-udajov"];
  const cars = await getCarsForSitemap();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date("2026-05-02"),
      changeFrequency: route === "" ? "daily" as const : "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...cars.map((car) => ({
      url: `${siteUrl}/vozidlo/${createCarSlug(car)}`,
      lastModified: new Date(car.updatedAt || car.createdAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
