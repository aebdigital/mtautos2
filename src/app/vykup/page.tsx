import type { Metadata } from "next";
import { Banknote, ClipboardCheck, Handshake, Timer } from "lucide-react";
import ServicePage from "@/components/ServicePage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Výkup vozidiel - peniaze ihneď",
  description: "Výkup vozidiel v MT AUTOS Sučany. Férové ocenenie, rýchle vybavenie, platba ihneď a kompletný prepis.",
  alternates: { canonical: "/vykup" },
  openGraph: {
    title: "Výkup vozidiel | MT AUTOS",
    description: "Rýchly a férový výkup vozidiel v hotovosti.",
    url: absoluteUrl("/vykup"),
    images: [absoluteUrl("/vykup.webp")],
  },
};

export default function VykupPage() {
  return (
    <ServicePage
      heroTitle="VÝKUP VOZIDIEL"
      heading={<>Výkup vozidiel <span className="text-red-500">rýchlo a férovo</span></>}
      intro="Predajte svoje vozidlo bez zbytočného čakania. Auto oceníme férovo a po dohode vyriešime platbu aj administratívu."
      image="/vykup.webp"
      imageAlt="Výkup vozidiel"
      accentTextClass="text-red-500"
      accentBgClass="bg-red-500/10"
      ctaGradientClass="from-red-600 to-slate-900"
      features={[
        { title: "Platba ihneď", description: "Peniaze za vozidlo dostanete pri odovzdaní podľa dohody.", icon: <Banknote className="h-7 w-7" /> },
        { title: "Rýchle vybavenie", description: "Celý proces výkupu zvládneme rýchlo a bez zbytočných úkonov.", icon: <Timer className="h-7 w-7" /> },
        { title: "Férové ocenenie", description: "Vozidlo oceníme transparentne podľa stavu a aktuálnej trhovej hodnoty.", icon: <Handshake className="h-7 w-7" /> },
        { title: "Kompletný prepis", description: "Poistenie, prepis a úradné záležitosti vybavíme za vás.", icon: <ClipboardCheck className="h-7 w-7" /> },
      ]}
      steps={[
        { step: "01", title: "Kontaktujte nás", desc: "Zavolajte alebo napíšte s informáciami o vozidle." },
        { step: "02", title: "Ocenenie vozidla", desc: "Férovo posúdime stav a cenu vozidla." },
        { step: "03", title: "Okamžitá platba", desc: "Po dohode vám vyplatíme dohodnutú čiastku." },
      ]}
      ctaTitle="Chcete predať svoje vozidlo?"
      ctaText="Ozvite sa nám a pripravíme vám férovú ponuku výkupu."
    />
  );
}
