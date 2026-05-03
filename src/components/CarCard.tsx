import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/types/car";
import { createCarSlug } from "@/lib/site";

const iconMap = {
  year: "/icons/rok.svg",
  fuel: "/icons/palivo.svg",
  mileage: "/icons/km.svg",
  power: "/icons/vykon.svg",
};

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const isReservedByDate = car.reservedUntil ? new Date(car.reservedUntil) > new Date() : false;
  const isReserved = car.reserved || isReservedByDate;
  const href = `/vozidlo/${createCarSlug(car)}`;

  return (
    <Link href={href} className="car-card block overflow-hidden bg-white shadow-lg transition-all hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={car.image || "/hero section.jpg"}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute right-0 top-0 z-10 rounded-bl bg-red-600 px-4 py-2 font-jost text-lg font-bold text-white">
          {car.price.toLocaleString("sk-SK")} €
        </div>
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-2">
          {car.sold ? (
            <div className="rounded-full bg-red-600 px-2 py-1 font-montserrat text-xs font-bold uppercase text-white">
              PREDANÉ
            </div>
          ) : isReserved ? (
            <div className="rounded-full bg-orange-500 px-2 py-1 font-montserrat text-xs font-bold uppercase text-white">
              REZERVOVANÉ
            </div>
          ) : null}
        </div>
      </div>

      <div className="px-4 pt-4">
        <h3 className="mb-2 text-lg font-bold text-gray-800">
          {car.brand} {car.model}
        </h3>
        <div className="mb-3 grid gap-1 text-xs text-gray-600" style={{ gridTemplateColumns: "1fr 1fr 1.3fr 1fr" }}>
          <CarStat icon={iconMap.year} label="Rok" value={String(car.year)} />
          <CarStat icon={iconMap.fuel} label="Palivo" value={car.fuel} />
          <CarStat icon={iconMap.mileage} label="Najazdené km" value={`${car.mileage.toLocaleString("sk-SK")} km`} />
          <CarStat icon={iconMap.power} label="Výkon" value={car.power || "N/A"} />
        </div>
        {car.vatDeductible && car.priceWithoutVat ? (
          <div className="-mx-4 bg-black px-3 py-2 font-montserrat text-xs font-bold text-white">
            Odpočet DPH: {car.priceWithoutVat.toLocaleString("sk-SK")} €
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function CarStat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center">
      <div className="relative mr-1 h-4 w-4">
        <Image src={icon} alt={label} fill />
      </div>
      <span className="truncate font-bold text-gray-800">{value}</span>
    </div>
  );
}
