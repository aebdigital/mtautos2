import type { Metadata } from "next";
import MiniHero from "@/components/MiniHero";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov",
  description: "Zásady ochrany osobných údajov spoločnosti MT AUTOS s.r.o. Informácie o spracúvaní osobných údajov a cookies.",
  alternates: { canonical: "/ochrana-osobnych-udajov" },
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <MiniHero title="OCHRANA OSOBNÝCH ÚDAJOV" />

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-center font-jost text-4xl font-bold md:text-5xl">
              Zásady ochrany <span className="text-blue-500">osobných údajov</span>
            </h1>
            <p className="mb-16 text-center text-lg leading-relaxed text-gray-600">
              Vaše osobné údaje spracúvame v súlade s nariadením GDPR a slovenskou legislatívou.
            </p>

            <div className="space-y-10">
              <section className="rounded-lg border border-gray-100 bg-gray-50 p-8">
                <h2 className="mb-4 font-jost text-2xl font-bold">Prevádzkovateľ</h2>
                <div className="leading-relaxed text-gray-700">
                  <p className="font-bold">MT AUTOS s.r.o.</p>
                  <p>ul. 29 augusta 2261/145, 038 52 Sučany</p>
                  <p>IČO: 47584017, DIČ: 2023992652</p>
                  <p>E-mail: mtautossro@gmail.com</p>
                  <p>Tel.: +421 915 511 111</p>
                </div>
              </section>

              <section className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg">
                <h2 className="mb-4 font-jost text-2xl font-bold">I. Kontaktný formulár</h2>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Osobné údaje z kontaktného formulára používame výlučne na vybavenie vašej otázky alebo žiadosti o ponuku.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <InfoBlock title="Rozsah spracúvaných údajov" items={["Meno a priezvisko", "E-mailová adresa", "Telefónne číslo", "Text správy"]} />
                  <InfoBlock title="Právny základ" items={["Článok 6 ods. 1 písm. b) GDPR", "Opatrenia pred uzavretím zmluvy na žiadosť dotknutej osoby"]} />
                </div>
              </section>

              <section className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg">
                <h2 className="mb-4 font-jost text-2xl font-bold">II. Súbory cookies</h2>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Používame nevyhnutné cookies pre fungovanie stránky a voliteľné analytické cookies len na základe vášho súhlasu.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <InfoBlock title="Nevyhnutné cookies" items={["Zabezpečujú základnú funkčnosť stránky", "Nie je možné ich vypnúť"]} />
                  <InfoBlock title="Štatistické cookies" items={["Pomáhajú zlepšovať služby", "Používajú sa len so súhlasom"]} />
                </div>
              </section>

              <section className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg">
                <h2 className="mb-4 font-jost text-2xl font-bold">III. Práva dotknutej osoby</h2>
                <ul className="space-y-3 text-gray-600">
                  {[
                    "Právo na prístup k osobným údajom",
                    "Právo na opravu nepresných údajov",
                    "Právo na vymazanie, ak na spracúvanie už nie je právny základ",
                    "Právo na obmedzenie spracúvania",
                    "Právo na prenosnosť údajov",
                    "Právo odvolať súhlas",
                    "Právo podať sťažnosť na Úrad na ochranu osobných údajov SR",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 font-bold text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-3 font-jost font-bold">{title}</h3>
      <ul className="ml-5 list-disc space-y-1 text-gray-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
