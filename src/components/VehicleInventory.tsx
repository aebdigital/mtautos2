"use client";

import { useCallback, useState } from "react";
import type { Car } from "@/types/car";
import CarCard from "./CarCard";
import CarFilter from "./CarFilter";

interface VehicleInventoryProps {
  cars: Car[];
}

export default function VehicleInventory({ cars }: VehicleInventoryProps) {
  const [filteredCars, setFilteredCars] = useState(cars);
  const handleFilter = useCallback((filtered: Car[]) => setFilteredCars(filtered), []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="font-montserrat text-xl text-gray-600">
          Zobrazené: {filteredCars.length} z {cars.length} vozidiel
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <CarFilter cars={cars} onFilter={handleFilter} />
        </div>

        <div className="lg:col-span-3">
          {filteredCars.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="mb-4 font-jost text-2xl font-bold">Žiadne vozidlá</h2>
              <p className="font-montserrat text-gray-600">Skúste zmeniť filtre pre zobrazenie vozidiel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
