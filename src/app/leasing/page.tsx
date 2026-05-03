import type { Metadata } from "next";
import { BadgePercent, CarFront, CircleGauge, WalletCards } from "lucide-react";
import ServicePage from "@/components/ServicePage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leasing a financovanie vozidiel",
  description: "Leasing, autoúver a financovanie vozidiel v MT AUTOS. Rýchle schválenie, výhodné podmienky a možnosť použiť vaše auto ako akontáciu.",
  alternates: { canonical: "/leasing" },
  openGraph: {
    title: "Leasing a financovanie vozidiel | MT AUTOS",
    description: "Výhodné financovanie vozidiel cez MT AUTOS.",
    url: absoluteUrl("/leasing"),
    images: [absoluteUrl("/leasing.jpg")],
  },
};

export default function LeasingPage() {
  return (
    <ServicePage
      heroTitle="LEASING & AUTOÚVER"
      heading={<>Financovanie vozidiel <span className="text-green-500">bez starostí</span></>}
      intro="Pomôžeme vám s leasingom alebo autoúverom tak, aby ste mohli jazdiť čo najskôr a za výhodných podmienok."
      image="/leasing.jpg"
      imageAlt="Leasing a autoúver"
      accentTextClass="text-green-500"
      accentBgClass="bg-green-500/10"
      ctaGradientClass="from-green-600 to-slate-900"
      features={[
        { title: "0% akontácia", description: "Schválenie úveru aj s minimálnou alebo nulovou akontáciou.", icon: <BadgePercent className="h-7 w-7" /> },
        { title: "Vaše auto ako akontácia", description: "Súčasné vozidlo môžete použiť ako akontáciu na nové auto.", icon: <CarFront className="h-7 w-7" /> },
        { title: "Rýchle schválenie", description: "Výsledok schválenia býva dostupný rýchlo a bez zbytočnej administratívy.", icon: <CircleGauge className="h-7 w-7" /> },
        { title: "Výhodné podmienky", description: "Financovanie pripravíme podľa možností a potrieb zákazníka.", icon: <WalletCards className="h-7 w-7" /> },
      ]}
      steps={[
        { step: "01", title: "Vyberte si auto", desc: "Vyberte si z ponuky alebo si nechajte auto doviezť." },
        { step: "02", title: "Podajte žiadosť", desc: "Žiadosť o úver pripravíme priamo u nás." },
        { step: "03", title: "Schválenie", desc: "Po schválení pripravíme dokumenty." },
        { step: "04", title: "Šťastná jazda", desc: "Odchádzate s novým autom." },
      ]}
      ctaTitle="Chcete financovať vozidlo?"
      ctaText="Kontaktujte nás a pripravíme vám možnosti financovania."
    />
  );
}
