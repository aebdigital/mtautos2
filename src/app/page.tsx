import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, CircleDollarSign, ClipboardCheck, Landmark, ShieldCheck, WalletCards } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CarCard from "@/components/CarCard";
import { getCarsForPonuka } from "@/lib/cars";
import { absoluteUrl, siteDescription, siteTitle } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MT AUTOS - Autobazár Sučany pri Martine",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: absoluteUrl("/"),
    images: [absoluteUrl("/og-image.jpg")],
  },
};

export default async function HomePage() {
  const cars = await getCarsForPonuka();
  const homepageCars = cars.filter((car) => car.showOnHomepage);
  const displayCars = (homepageCars.length > 0 ? homepageCars : cars).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-jost text-5xl font-bold md:text-6xl">NAJNOVŠIE VOZIDLÁ</h2>
          </div>

          {displayCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {displayCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
              {cars.length > 4 ? (
                <div className="mt-8 text-center">
                  <Link
                    href="/ponuka"
                    className="inline-block rounded-lg bg-red-600 px-8 py-4 font-montserrat text-lg font-bold text-white hover:bg-red-700"
                  >
                    Zobraziť všetky vozidlá ({cars.length})
                  </Link>
                </div>
              ) : null}
            </>
          ) : (
            <p className="py-12 text-center font-montserrat text-xl text-gray-600">Aktuálne pripravujeme ponuku vozidiel.</p>
          )}
        </div>
      </section>

      <Services />
      <WhyUsSection />
    </div>
  );
}

const reasons = [
  {
    icon: ClipboardCheck,
    title: "Kvalitné a preverené vozidlá",
    desc: "Z dovozu aj so slovenským pôvodom. Každé vozidlo je dôkladne skontrolované.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: CheckCircle,
    title: "Garancia najazdených KM",
    desc: "Garantujeme pravosť najazdených kilometrov na každom vozidle.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: CircleDollarSign,
    title: "Výhodné financovanie",
    desc: "Schválenie úveru aj s minimálnou akontáciou. Použite vaše auto ako akontáciu.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: ShieldCheck,
    title: "PZP + HAV za výhodné ceny",
    desc: "Poistenie od Generali, Allianz a Kooperativa za najlepšie ceny.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: WalletCards,
    title: "Výkup vozidiel v hotovosti",
    desc: "Platba ihneď pri odovzdaní vozidla. Rýchle a férové ocenenie.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Landmark,
    title: "Kompletné vybavenie",
    desc: "Od predaja, poistenia až po prepis vozidla - všetko vybavíme za vás.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

function WhyUsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center font-jost text-4xl font-bold md:text-6xl">
          PREČO <span className="text-blue-500">MT AUTOS?</span>
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center font-montserrat text-lg text-gray-500">
          Poskytujeme kompletné služby od predaja, dovozu, financovania až po poistenie a prepis vozidla.
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group rounded-lg border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-lg ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 font-jost text-xl font-bold">{item.title}</h3>
                <p className="font-montserrat leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
