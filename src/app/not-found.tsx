import Link from "next/link";
import MiniHero from "@/components/MiniHero";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <MiniHero title="Stránka sa nenašla" />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 font-jost text-3xl font-bold">Požadovaná stránka neexistuje</h1>
        <p className="mb-8 font-montserrat text-gray-600">Skontrolujte adresu alebo pokračujte späť na ponuku vozidiel.</p>
        <Link href="/ponuka" className="inline-block rounded bg-black px-6 py-3 font-montserrat font-bold text-white hover:bg-gray-800">
          Späť na ponuku
        </Link>
      </div>
    </div>
  );
}
