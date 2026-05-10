import type { Metadata } from "next";
import MiniHero from "@/components/MiniHero";
import VehicleInventory from "@/components/VehicleInventory";
import { getCarsForPonuka } from "@/lib/cars";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Ponuka vozidiel",
  description: "Aktuálna ponuka jazdených vozidiel v MT AUTOS Sučany. Široký výber áut, možnosť financovania a poistenia.",
  alternates: {
    canonical: "/ponuka",
  },
  openGraph: {
    title: "Ponuka vozidiel | MT AUTOS Sučany",
    description: "Aktuálna ponuka jazdených vozidiel v MT AUTOS Sučany.",
    url: absoluteUrl("/ponuka"),
    images: [absoluteUrl("/og-image.jpg")],
  },
};

export default async function PonukaPage() {
  const cars = await getCarsForPonuka();

  return (
    <div className="min-h-screen bg-gray-100">
      <MiniHero title="PONUKA" />
      <VehicleInventory cars={cars} />
    </div>
  );
}
