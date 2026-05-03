"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PublicCarFull } from "@/types/car";
import { equipmentCategories } from "@/data/equipmentOptions";

const icons: Record<string, string> = {
  Pohon: "/icons/pohon.svg",
  Palivo: "/icons/palivo.svg",
  Kilometre: "/icons/km.svg",
  Výkon: "/icons/vykon.svg",
  Prevodovka: "/icons/prevodovka.svg",
  "Objem motora": "/icons/motor.svg",
  "Rok výroby": "/icons/rok.svg",
  Karoséria: "/icons/karoseria.svg",
  VIN: "/icons/VIN.svg",
  Dvere: "/icons/dvere.svg",
  Farba: "/icons/farba.svg",
  "Počet miest": "/icons/seats.svg",
};

interface CarDetailViewProps {
  car: PublicCarFull;
}

export default function CarDetailView({ car }: CarDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [car.mainImageUrl, ...(car.galleryImageUrls || [])].filter(Boolean);
  const galleryImages = images.length ? images : [car.image || "/hero section.jpg"];

  const basicData = [
    { label: "Pohon", value: car.drivetrain, icon: icons.Pohon },
    { label: "Palivo", value: car.fuel, icon: icons.Palivo },
    { label: "Kilometre", value: car.mileage ? `${car.mileage.toLocaleString("sk-SK")} km` : null, icon: icons.Kilometre },
    { label: "Výkon", value: car.power, icon: icons.Výkon },
    { label: "Prevodovka", value: formatTransmission(car), icon: icons.Prevodovka },
    { label: "Objem motora", value: car.engine, icon: icons["Objem motora"] },
    { label: "Rok výroby", value: car.month && car.year ? `${car.month}/${car.year}` : car.year?.toString(), icon: icons["Rok výroby"] },
    { label: "Karoséria", value: car.bodyType, icon: icons.Karoséria },
    { label: "Dvere", value: car.doors, icon: icons.Dvere },
    { label: "Počet miest", value: car.seats?.toString(), icon: icons["Počet miest"] },
    { label: "Farba", value: car.color, icon: icons.Farba },
    { label: "Platnosť STK/EK", value: car.stkValidity ? formatMonthYear(car.stkValidity) : null, icon: icons["Rok výroby"] },
    { label: "VIN", value: car.vin, icon: icons.VIN },
  ].filter((item) => item.value && item.value !== "N/A" && item.value !== "");

  return (
    <>
      <div className="py-8">
        <div className="block w-full md:hidden">
          <div className="relative h-[40vh] w-full">
            <img
              src={galleryImages[currentImageIndex]}
              alt={`${car.brand} ${car.model}`}
              className="h-full w-full object-cover"
              loading="eager"
              onClick={() => setLightboxIndex(currentImageIndex)}
            />
            {galleryImages.length > 1 ? (
              <>
                <GalleryButton
                  label="Predchádzajúca fotka"
                  side="left"
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                />
                <GalleryButton
                  label="Ďalšia fotka"
                  side="right"
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
                />
                <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="hidden w-full overflow-x-auto px-1 md:block">
          <div className="flex h-[499px] gap-1">
            <button type="button" onClick={() => setLightboxIndex(0)} className="h-[499px] w-[624px] flex-shrink-0 overflow-hidden">
              <img src={galleryImages[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-opacity hover:opacity-90" loading="eager" />
            </button>
            <div className="flex gap-1">
              {galleryImages.slice(1).map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setLightboxIndex(index + 1)}
                  className="h-[248px] w-[336px] flex-shrink-0 overflow-hidden"
                >
                  <img src={image} alt={`${car.brand} ${car.model} ${index + 2}`} className="h-full w-full object-cover transition-opacity hover:opacity-80" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mb-8 mt-8 w-[90%] border-b border-gray-200 pb-5 md:mt-10 md:w-4/5">
          <h1 className="mb-2 font-jost text-4xl font-bold">
            {car.brand} {car.model}
          </h1>
          <p className="mb-2 font-montserrat text-gray-600">
            {car.year} • {car.mileage?.toLocaleString("sk-SK")} km • {car.fuel} • {car.transmission}
          </p>
          <div className="font-montserrat text-3xl font-bold text-red-600">{car.price?.toLocaleString("sk-SK")} €</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {car.sold ? (
              <Badge>PREDANÉ</Badge>
            ) : car.reserved ? (
              <Badge>REZERVOVANÉ</Badge>
            ) : null}
            {car.vatDeductible && car.priceWithoutVat ? <Badge>Odpočet DPH: {car.priceWithoutVat.toLocaleString("sk-SK")} €</Badge> : null}
          </div>
        </div>

        {basicData.length > 0 ? (
          <section className="mx-auto w-[90%] md:w-4/5">
            <h2 className="mb-5 font-jost text-2xl font-semibold">Základné údaje</h2>
            <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {basicData.map((item) => (
                <div key={item.label} className="flex items-center">
                  <img src={item.icon} alt={item.label} className="mr-3 h-10 w-10 flex-shrink-0" />
                  <div>
                    <div className="font-montserrat text-lg leading-tight">{item.label}</div>
                    <div className="font-montserrat text-base font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {car.description ? (
          <section className="mx-auto mb-10 w-[90%] md:w-4/5">
            <h2 className="mb-5 font-jost text-2xl font-semibold">Popis</h2>
            <div className="overflow-hidden break-words rounded-lg bg-gray-50 p-4 font-montserrat whitespace-pre-wrap">{car.description}</div>
          </section>
        ) : null}

        {car.features?.length ? (
          <section className="mx-auto mb-10 w-[90%] md:w-4/5">
            <h2 className="mb-5 font-jost text-2xl font-semibold">Výbava</h2>
            <div className="space-y-6">
              {equipmentCategories.map((category) => {
                const categoryFeatures = car.features?.filter((feature) => category.options.includes(feature)) || [];
                if (!categoryFeatures.length) return null;
                return (
                  <div key={category.name}>
                    <h3 className="mb-3 font-jost text-xl font-semibold text-gray-800">{category.name}</h3>
                    <ul className="grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3 lg:grid-cols-4">
                      {categoryFeatures.map((feature) => (
                        <FeatureItem key={feature} feature={feature} car={car} />
                      ))}
                    </ul>
                  </div>
                );
              })}
              <UncategorizedFeatures car={car} />
            </div>
          </section>
        ) : null}

        <div className="mx-auto mb-12 w-[90%] md:w-4/5">
          <Link href="/ponuka" className="inline-block rounded bg-black px-6 py-3 font-montserrat font-bold text-white hover:bg-gray-800">
            Späť na ponuku
          </Link>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur" onClick={() => setLightboxIndex(null)}>
          <button type="button" onClick={() => setLightboxIndex(null)} className="fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg">
            <X className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length));
            }}
            className="fixed left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg md:left-8"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % galleryImages.length));
            }}
            className="fixed right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg md:right-8"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <img
            src={galleryImages[lightboxIndex]}
            alt={`${car.brand} ${car.model}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded bg-white px-3 py-1 text-sm text-black shadow">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      ) : null}
    </>
  );
}

function GalleryButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 ${
        side === "left" ? "left-2" : "right-2"
      }`}
    >
      {side === "left" ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
    </button>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <div className="inline-block rounded bg-black px-4 py-2 font-montserrat text-sm font-bold text-white">{children}</div>;
}

function formatTransmission(car: PublicCarFull) {
  if (car.transmissionType) {
    const type = car.transmissionType === "automatic" ? "Automatická" : "Manuálna";
    return car.transmissionGears ? `${type} ${car.transmissionGears}-st.` : type;
  }
  return car.transmission;
}

function formatMonthYear(value: string) {
  const date = new Date(value);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}

function FeatureItem({ feature, car }: { feature: string; car: PublicCarFull }) {
  const translations: Record<string, Record<string, string>> = {
    parkingSensors: { front: "Predné", rear: "Zadné", front_rear: "Predné + Zadné" },
    acType: { manual: "Manuálna", automatic: "Automatická" },
    electricWindows: { "2_front": "2x (predné)", "4_all": "4x (všetky)", "2": "2x (predné)", "4": "4x (všetky)" },
    heatedSeats: { front: "Predné", front_rear: "Predné + Zadné", all: "Všetky" },
  };

  let displayText = feature;
  let valueText = "";

  if ((feature === "Airbagy – počet" || feature === "Airbagy") && car.airbagCount) {
    displayText = "Počet airbagov";
    valueText = car.airbagCount.toString();
  } else if (feature === "Klimatizácia" && car.acType) {
    valueText = (translations.acType[car.acType] || car.acType) + (car.acZones ? ` (${car.acZones})` : "");
  } else if (feature === "Parkovacie senzory" && car.parkingSensors) {
    valueText = translations.parkingSensors[car.parkingSensors] || car.parkingSensors;
  } else if (feature === "Elektrické okná" && car.electricWindows) {
    valueText = translations.electricWindows[car.electricWindows] || car.electricWindows;
  } else if (feature === "Vyhrievané sedadlá" && car.heatedSeats) {
    valueText = translations.heatedSeats[car.heatedSeats] || car.heatedSeats;
  }

  return (
    <li className="flex items-start font-montserrat">
      <span className="mr-2 mt-0.5 font-bold text-blue-500">✓</span>
      <span className="flex flex-col">
        <span>{displayText}</span>
        {valueText ? <span className="text-sm font-semibold text-gray-600">{valueText}</span> : null}
      </span>
    </li>
  );
}

function UncategorizedFeatures({ car }: { car: PublicCarFull }) {
  const allCategoryOptions = equipmentCategories.flatMap((category) => category.options);
  const uncategorizedFeatures = car.features?.filter((feature) => !allCategoryOptions.includes(feature)) || [];

  if (!uncategorizedFeatures.length) return null;

  return (
    <div>
      <h3 className="mb-3 font-jost text-xl font-semibold text-gray-800">Ostatná výbava</h3>
      <ul className="grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3 lg:grid-cols-4">
        {uncategorizedFeatures.map((feature) => (
          <li key={feature} className="flex items-start font-montserrat">
            <span className="mr-2 mt-0.5 font-bold text-blue-500">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
