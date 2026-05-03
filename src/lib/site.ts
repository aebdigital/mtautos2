export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.REACT_APP_SITE_URL ||
  "https://mtautos.sk"
).replace(/\/$/, "");

export const siteName = "MT AUTOS";
export const siteTitle = "MT AUTOS - Autobazár Sučany pri Martine";
export const siteDescription =
  "Váš spoľahlivý autobazár v Sučanoch pri Martine. Predaj, dovoz, výkup, leasing a poistenie vozidiel.";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createCarSlug(car: { brand: string; model: string; year: number | null; id: string }) {
  return `${car.brand}-${car.model}-${car.year ?? ""}-${car.id}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractCarIdFromSlug(slug: string) {
  return slug.slice(-36);
}
