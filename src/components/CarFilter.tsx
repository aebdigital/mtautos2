"use client";

import { useEffect, useMemo, useState } from "react";
import type { Car } from "@/types/car";

interface CarFilterProps {
  cars: Car[];
  onFilter: (filteredCars: Car[]) => void;
}

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  fuelTypes: string[];
  yearRange: [number, number];
  transmissionTypes: string[];
}

export default function CarFilter({ cars, onFilter }: CarFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const stats = useMemo(() => {
    const prices = cars.map((car) => car.price).filter(Number.isFinite);
    const years = cars.map((car) => car.year).filter(Number.isFinite);
    return {
      allBrands: Array.from(new Set(cars.map((car) => car.brand).filter(Boolean))).sort(),
      allFuelTypes: Array.from(new Set(cars.map((car) => car.fuel).filter(Boolean))).sort(),
      allTransmissions: Array.from(new Set(cars.map((car) => car.transmission).filter(Boolean))).sort(),
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      minYear: years.length ? Math.min(...years) : new Date().getFullYear(),
      maxYear: years.length ? Math.max(...years) : new Date().getFullYear(),
    };
  }, [cars]);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [stats.minPrice, stats.maxPrice],
    brands: [],
    fuelTypes: [],
    yearRange: [stats.minYear, stats.maxYear],
    transmissionTypes: [],
  });

  useEffect(() => {
    setFilters({
      priceRange: [stats.minPrice, stats.maxPrice],
      brands: [],
      fuelTypes: [],
      yearRange: [stats.minYear, stats.maxYear],
      transmissionTypes: [],
    });
  }, [stats.minPrice, stats.maxPrice, stats.minYear, stats.maxYear]);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const priceMatch = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(car.brand);
      const fuelMatch = filters.fuelTypes.length === 0 || filters.fuelTypes.includes(car.fuel);
      const yearMatch = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];
      const transmissionMatch =
        filters.transmissionTypes.length === 0 || filters.transmissionTypes.includes(car.transmission);

      return priceMatch && brandMatch && fuelMatch && yearMatch && transmissionMatch;
    });

    onFilter(filtered);
  }, [filters, cars, onFilter]);

  const resetFilters = () => {
    setFilters({
      priceRange: [stats.minPrice, stats.maxPrice],
      brands: [],
      fuelTypes: [],
      yearRange: [stats.minYear, stats.maxYear],
      transmissionTypes: [],
    });
  };

  const toggle = (key: "brands" | "fuelTypes" | "transmissionTypes", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
    }));
  };

  const priceDenominator = Math.max(1, stats.maxPrice - stats.minPrice);
  const yearDenominator = Math.max(1, stats.maxYear - stats.minYear);

  return (
    <>
      <div className="mb-6 lg:hidden">
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 font-montserrat"
        >
          <span className="font-semibold">Filtre vozidiel</span>
          <span className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}>↓</span>
        </button>
      </div>

      <div className={`rounded-lg bg-white p-6 shadow-lg ${isExpanded ? "block" : "hidden"} lg:block`}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-jost text-xl font-bold">Filtre</h3>
          <button type="button" onClick={resetFilters} className="font-montserrat text-sm text-blue-600 hover:text-blue-800">
            Vymazať
          </button>
        </div>

        <div className="space-y-6">
          <RangeFilter
            label={`Cena (€): ${filters.priceRange[0].toLocaleString("sk-SK")} - ${filters.priceRange[1].toLocaleString("sk-SK")}`}
            min={stats.minPrice}
            max={stats.maxPrice}
            minValue={filters.priceRange[0]}
            maxValue={filters.priceRange[1]}
            denominator={priceDenominator}
            onMin={(value) => setFilters((prev) => ({ ...prev, priceRange: [Math.min(value, prev.priceRange[1]), prev.priceRange[1]] }))}
            onMax={(value) => setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], Math.max(value, prev.priceRange[0])] }))}
          />

          <RangeFilter
            label={`Rok: ${filters.yearRange[0]} - ${filters.yearRange[1]}`}
            min={stats.minYear}
            max={stats.maxYear}
            minValue={filters.yearRange[0]}
            maxValue={filters.yearRange[1]}
            denominator={yearDenominator}
            onMin={(value) => setFilters((prev) => ({ ...prev, yearRange: [Math.min(value, prev.yearRange[1]), prev.yearRange[1]] }))}
            onMax={(value) => setFilters((prev) => ({ ...prev, yearRange: [prev.yearRange[0], Math.max(value, prev.yearRange[0])] }))}
          />

          <CheckGroup label="Značka" values={stats.allBrands} selected={filters.brands} onToggle={(value) => toggle("brands", value)} grid />
          <CheckGroup label="Palivo" values={stats.allFuelTypes} selected={filters.fuelTypes} onToggle={(value) => toggle("fuelTypes", value)} />
          <CheckGroup
            label="Prevodovka"
            values={stats.allTransmissions}
            selected={filters.transmissionTypes}
            onToggle={(value) => toggle("transmissionTypes", value)}
          />
        </div>
      </div>
    </>
  );
}

function RangeFilter({
  label,
  min,
  max,
  minValue,
  maxValue,
  denominator,
  onMin,
  onMax,
}: {
  label: string;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  denominator: number;
  onMin: (value: number) => void;
  onMax: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-3 block font-jost text-sm font-semibold">{label}</label>
      <div className="space-y-3">
        <div className="flex items-center justify-between font-montserrat text-xs text-gray-600">
          <span>{min.toLocaleString("sk-SK")}</span>
          <span>{max.toLocaleString("sk-SK")}</span>
        </div>
        <div className="relative h-5">
          <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-gray-200" />
          <div
            className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-500"
            style={{
              left: `${((minValue - min) / denominator) * 100}%`,
              right: `${100 - ((maxValue - min) / denominator) * 100}%`,
            }}
          />
          <input type="range" min={min} max={maxValue} value={minValue} onChange={(event) => onMin(Number(event.target.value))} className="slider-thumb" />
          <input type="range" min={minValue} max={max} value={maxValue} onChange={(event) => onMax(Number(event.target.value))} className="slider-thumb" />
        </div>
        <div className="flex items-center justify-between">
          <input type="number" min={min} max={maxValue} value={minValue} onChange={(event) => onMin(Number(event.target.value) || min)} className="w-24 rounded border border-gray-300 px-2 py-1 font-montserrat text-xs" />
          <span className="font-montserrat text-gray-400">-</span>
          <input type="number" min={minValue} max={max} value={maxValue} onChange={(event) => onMax(Number(event.target.value) || max)} className="w-24 rounded border border-gray-300 px-2 py-1 font-montserrat text-xs" />
        </div>
      </div>
    </div>
  );
}

function CheckGroup({
  label,
  values,
  selected,
  onToggle,
  grid = false,
}: {
  label: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
  grid?: boolean;
}) {
  return (
    <div>
      <label className="mb-3 block font-jost text-sm font-semibold">{label}</label>
      <div className={grid ? "grid max-h-40 grid-cols-2 gap-1 overflow-y-auto" : "space-y-2"}>
        {values.map((value) => (
          <label key={value} className="flex items-center font-montserrat text-sm">
            <input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} className="mr-2" />
            <span className="truncate">{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
