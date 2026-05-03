import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gray-400 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)), url("/hero section.jpg")',
        }}
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl text-left">
          <h1 className="mb-6 font-jost text-5xl font-bold md:text-7xl">
            VÍTAME VÁS V AUTOBAZÁRI
            <br />
            <span className="text-blue-400">MT AUTOS</span>
            <br className="md:hidden" />
            <span className="text-2xl text-white underline md:text-4xl">Sučany pri Martine!</span>
          </h1>
          <p className="mb-10 max-w-3xl font-montserrat text-lg leading-relaxed md:text-2xl">
            Vyberte si spoľahlivé vozidlo z našej ponuky nových, kontrolovaných ojazdených
            automobilov a nechajte si ho doviesť priamo ku vám.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Link
              href="/ponuka"
              className="inline-block w-full rounded border-2 border-white bg-red-600 px-6 py-3 text-center font-montserrat text-lg font-bold text-white hover:bg-red-700 md:w-auto"
            >
              Pozrite si ponuku
            </Link>
            <Link
              href="/kontakt"
              className="inline-block w-full rounded border-2 border-white bg-black px-6 py-3 text-center font-montserrat text-lg font-bold text-white hover:bg-gray-800 md:w-auto"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
