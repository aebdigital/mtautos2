import type { Metadata } from "next";
import MiniHero from "@/components/MiniHero";
import ContactForm from "@/components/ContactForm";
import { getActivePhonesForSite } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktujte MT AUTOS Sučany. Predaj, výkup a dovoz vozidiel. Adresa, telefón, email a otváracie hodiny.",
  alternates: {
    canonical: "/kontakt",
  },
  openGraph: {
    title: "Kontakt | MT AUTOS Sučany",
    description: "Kontaktujte MT AUTOS Sučany.",
    url: absoluteUrl("/kontakt"),
    images: [absoluteUrl("/og-image.jpg")],
  },
};

export default async function KontaktPage() {
  const phones = await getActivePhonesForSite().catch(() => []);

  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="KONTAKT" />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-6 font-montserrat">
            <div>
              <h2 className="mb-2 font-jost text-lg font-semibold">MT AUTOS s.r.o.</h2>
              <div className="leading-relaxed text-gray-700">
                <p>29 Augusta č.2261/145,</p>
                <p>03852 Sučany, okres Martin</p>
                <p>(Sučany-Juh, pri Čerpacej stanici Orlen)</p>
              </div>
            </div>

            <div>
              {phones.length > 0 ? (
                phones.map((phone, index) => (
                  <p key={phone} className={`text-gray-700 ${index === 0 ? "" : "ml-8"}`}>
                    {index === 0 ? <span className="font-semibold">Tel: </span> : null}
                    {phone}
                  </p>
                ))
              ) : (
                <p className="text-gray-700">
                  <span className="font-semibold">Tel:</span> +421 915 511 111
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-700">
                <span className="font-semibold">e-mail:</span> mtautossro@gmail.com
              </p>
            </div>

            <div>
              <p className="text-gray-700"><span className="font-semibold">IČO:</span> 47584017</p>
              <p className="text-gray-700"><span className="font-semibold">DIČ:</span> 2023992652</p>
              <p className="text-gray-700"><span className="font-semibold">IČ DPH:</span> SK2023992652</p>
            </div>

            <div>
              <h3 className="mb-2 font-jost text-lg font-semibold">Otváracie hodiny:</h3>
              <div className="text-gray-700">
                <p>Pondelok - piatok 9:00-17:00</p>
                <p>Sobota - 9:00 - 13:00</p>
                <p>Nedeľa - zatvorené</p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
