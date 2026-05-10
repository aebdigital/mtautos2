import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MiniHero from "@/components/MiniHero";
import CarDetailView from "@/components/CarDetailView";
import { getCarFullById } from "@/lib/cars";
import { absoluteUrl, extractCarIdFromSlug } from "@/lib/site";

export const revalidate = 300;

type VehiclePageProps = {
  params: Promise<{ slug: string }>;
};

async function getCarFromParams(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return getCarFullById(extractCarIdFromSlug(slug));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarFullById(extractCarIdFromSlug(slug));

  if (!car) {
    return {
      title: "Vozidlo sa nenašlo",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${car.brand} ${car.model} ${car.year}`;
  const description = `Predaj ${car.brand} ${car.model} ${car.year}, ${car.fuel || ""}, ${car.power || ""}, ${car.mileage?.toLocaleString("sk-SK") || 0} km. Cena: ${car.price?.toLocaleString("sk-SK") || 0} €.`;
  const url = absoluteUrl(`/vozidlo/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `/vozidlo/${slug}`,
    },
    openGraph: {
      type: "website",
      title: `${title} | MT AUTOS`,
      description,
      url,
      images: car.mainImageUrl ? [car.mainImageUrl] : [absoluteUrl("/og-image.jpg")],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MT AUTOS`,
      description,
      images: car.mainImageUrl ? [car.mainImageUrl] : [absoluteUrl("/og-image.jpg")],
    },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const car = await getCarFromParams(Promise.resolve({ slug }));

  if (!car) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.brand} ${car.model} ${car.year}`,
    image: [car.mainImageUrl, ...(car.galleryImageUrls?.slice(0, 5) || [])].filter(Boolean),
    description: car.description || `${car.brand} ${car.model} ${car.year}`,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/vozidlo/${slug}`),
      priceCurrency: "EUR",
      price: car.price,
      availability: car.sold
        ? "https://schema.org/OutOfStock"
        : car.reserved
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="VOZIDLO" />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarDetailView car={car} />
    </div>
  );
}
