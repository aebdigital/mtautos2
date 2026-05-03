import type { Metadata } from "next";
import { ClipboardCheck, Gauge, Globe2, Landmark } from "lucide-react";
import ServicePage from "@/components/ServicePage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dovoz vozidiel na objednávku",
  description: "Dovoz vozidiel na objednávku podľa vašich požiadaviek. Overené autá, kontrola histórie, dokumenty a kompletné vybavenie.",
  alternates: { canonical: "/dovoz" },
  openGraph: {
    title: "Dovoz vozidiel na objednávku | MT AUTOS",
    description: "Dovážame overené vozidlá podľa vašich požiadaviek.",
    url: absoluteUrl("/dovoz"),
    images: [absoluteUrl("/dovoz.jpg")],
  },
};

export default function DovozPage() {
  return (
    <ServicePage
      heroTitle="DOVOZ"
      heading={<>Dovoz vozidiel <span className="text-blue-500">na mieru</span></>}
      intro="Dovezieme vozidlo presne podľa vašich požiadaviek. Postaráme sa o vyhľadanie, overenie, dovoz aj kompletné dokumenty."
      image="/dovoz.jpg"
      imageAlt="Dovoz vozidiel"
      accentTextClass="text-blue-500"
      accentBgClass="bg-blue-500/10"
      ctaGradientClass="from-blue-600 to-slate-900"
      features={[
        {
          title: "Kvalitné a preverené vozidlá",
          description: "Dovážame len overené vozidlá. Každé auto prechádza dôkladnou kontrolou pred predajom.",
          icon: <ClipboardCheck className="h-7 w-7" />,
        },
        {
          title: "Garancia najazdených KM",
          description: "Overujeme históriu a pravosť najazdených kilometrov pri každom vozidle.",
          icon: <Gauge className="h-7 w-7" />,
        },
        {
          title: "Dovoz na mieru",
          description: "Poviete nám, aké auto hľadáte, a my sa postaráme o výber aj celý proces.",
          icon: <Globe2 className="h-7 w-7" />,
        },
        {
          title: "Kompletné vybavenie",
          description: "Predaj, poistenie, prepis aj administratívu vybavíme za vás.",
          icon: <Landmark className="h-7 w-7" />,
        },
      ]}
      steps={[
        { step: "01", title: "Povedzte nám, čo hľadáte", desc: "Opíšte značku, model, rozpočet a požadovanú výbavu." },
        { step: "02", title: "Nájdeme a overíme", desc: "Nájdeme vhodné vozidlo a preveríme jeho históriu aj stav." },
        { step: "03", title: "Dovezieme a vybavíme", desc: "Dovezieme auto a pripravíme všetky potrebné dokumenty." },
      ]}
      ctaTitle="Hľadáte konkrétne vozidlo?"
      ctaText="Kontaktujte nás a pripravíme vám dovoz na mieru."
    />
  );
}
