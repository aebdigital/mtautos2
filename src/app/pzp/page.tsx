import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BadgeEuro, CarFront, ShieldCheck } from "lucide-react";
import MiniHero from "@/components/MiniHero";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Poistenie vozidiel PZP a havarijné",
  description:
    "PZP a havarijné poistenie vozidiel v MT AUTOS Sučany. Výhodné ceny od viacerých poisťovní a vybavenie priamo pri kúpe auta.",
  alternates: { canonical: "/pzp" },
  openGraph: {
    title: "Poistenie vozidiel PZP a havarijné | MT AUTOS",
    description: "Výhodné PZP a havarijné poistenie vozidiel.",
    url: absoluteUrl("/pzp"),
    images: [absoluteUrl("/pzp.jpg")],
  },
};

const insuranceTypes = [
  {
    title: "PZP - Povinné zmluvné poistenie",
    description: "Zákonné poistenie zodpovednosti za škodu spôsobenú prevádzkou motorového vozidla.",
    icon: <ShieldCheck className="h-7 w-7" />,
  },
  {
    title: "HAV - Havarijné poistenie",
    description:
      "Dobrovoľné poistenie, ktoré kryje škody na vašom vozidle pri havárii, krádeži alebo živelnej udalosti.",
    icon: <CarFront className="h-7 w-7" />,
  },
  {
    title: "Výhodné ceny",
    description: "Vďaka spolupráci s viacerými poisťovňami vieme pripraviť vhodnú ponuku poistenia.",
    icon: <BadgeEuro className="h-7 w-7" />,
  },
];

const partners = [
  {
    name: "Generali",
    logo: "/generali.png",
    color: "from-red-500 to-red-700",
    description:
      "Jedna z najväčších poisťovní v Európe s dlhoročnou tradíciou a širokou škálou poistných produktov.",
  },
  {
    name: "Allianz",
    logo: "/alianz.webp",
    color: "from-blue-500 to-blue-700",
    description: "Svetový líder v poistení s prémiovou kvalitou služieb a kompletným poistným krytím.",
  },
  {
    name: "Kooperativa",
    logo: "/kooperativa copy.jpg",
    color: "from-green-500 to-green-700",
    description:
      "Najväčšia poisťovňa na Slovensku s najširšou sieťou pobočiek a rýchlym vybavením poistných udalostí.",
  },
  {
    name: "ČSOB",
    logo: "/CSOB_logo.jpg",
    color: "from-sky-500 to-sky-700",
    description:
      "Silná finančná skupina s komplexnými poistnými riešeniami a individuálnym prístupom ku klientom.",
  },
  {
    name: "Komunálna poisťovňa",
    logo: "/komunalna-poistovna-removebg-preview.png",
    color: "from-orange-500 to-orange-700",
    description: "Spoľahlivá slovenská poisťovňa s tradíciou a dostupnými cenami poistenia pre každého.",
  },
  {
    name: "Uniqa",
    logo: "/uniqua.svg",
    color: "from-indigo-500 to-indigo-700",
    description: "Medzinárodná poisťovňa so silným zázemím a modernými poistnými produktmi na mieru.",
  },
  {
    name: "Wüstenrot",
    logo: "/wustenrot.png",
    color: "from-red-600 to-red-800",
    description:
      "Tradičná poisťovňa s dlhoročnými skúsenosťami a stabilným zázemím pre spoľahlivé poistenie vozidiel.",
  },
];

export default function PZPPage() {
  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="PZP + HAV POISTENIE" />

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-jost text-4xl font-bold md:text-5xl">
              Poistenie vozidiel <span className="text-purple-500">za výhodné ceny</span>
            </h2>
            <p className="mx-auto max-w-3xl font-montserrat text-lg leading-relaxed text-gray-600">
              Pri kúpe vozidla vám pomôžeme vybaviť PZP aj havarijné poistenie priamo u nás.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-6">
              {insuranceTypes.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    {item.icon}
                  </div>
                  <h3 className="mb-3 font-jost text-xl font-bold">{item.title}</h3>
                  <p className="font-montserrat leading-relaxed text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="relative h-[420px] w-full overflow-hidden rounded-lg shadow-xl">
              <Image src="/pzp.jpg" alt="PZP poistenie" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-jost text-4xl font-bold">Spolupracujúce poisťovne</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className={`rounded-lg bg-gradient-to-br ${partner.color} p-8 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="mb-5 inline-block rounded-xl bg-white p-4">
                  <div className="relative h-10 w-32">
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                  </div>
                </div>
                <h3 className="mb-4 font-jost text-3xl font-bold">{partner.name}</h3>
                <p className="font-montserrat leading-relaxed text-white/90">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-jost text-4xl font-bold">Máte záujem o poistenie?</h2>
          <p className="mx-auto mb-10 max-w-2xl font-montserrat text-xl text-white/90">
            Kontaktujte nás a pripravíme vám výhodnú ponuku PZP alebo havarijného poistenia.
          </p>
          <Link
            href="/kontakt"
            className="inline-block rounded-lg bg-white px-10 py-4 font-montserrat text-lg font-bold text-purple-700 transition-colors hover:bg-gray-100"
          >
            Získať ponuku poistenia
          </Link>
        </div>
      </section>
    </div>
  );
}
