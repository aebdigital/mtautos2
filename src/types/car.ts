export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  images?: string[];
  features?: string[];
  engine?: string;
  power?: string;
  bodyType?: string;
  drivetrain?: string;
  vin?: string;
  description?: string;
  source?: "xml" | "admin";
  reservedUntil?: string;
  showOnHomepage?: boolean;
  vatDeductible?: boolean;
  priceWithoutVat?: number;
  reserved?: boolean;
  sold?: boolean;
}

export interface PublicCar {
  id: string;
  brand: string;
  model: string;
  year: number | null;
  price: number | null;
  mileage: number | null;
  fuel: string | null;
  transmission: string | null;
  image: string;
  power?: string | null;
  showOnHomepage?: boolean | null;
  vatDeductible?: boolean | null;
  priceWithoutVat?: number | null;
  reserved?: boolean | null;
  sold?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface PublicCarFull extends PublicCar {
  images?: string[] | null;
  features?: string[] | null;
  engine?: string | null;
  bodyType?: string | null;
  drivetrain?: string | null;
  vin?: string | null;
  description?: string | null;
  reservedUntil?: string | null;
  mainImageUrl: string;
  galleryImageUrls: string[];
  doors?: string | null;
  seats?: number | null;
  color?: string | null;
  month?: number | null;
  transmissionType?: string | null;
  transmissionGears?: string | null;
  airbagCount?: number | null;
  radioCd?: boolean | null;
  radioCdMp3?: boolean | null;
  androidAuto?: boolean | null;
  acType?: string | null;
  acZones?: string | null;
  parkingSensors?: string | null;
  electricWindows?: string | null;
  heatedSeats?: string | null;
  stkValidity?: string | null;
}
