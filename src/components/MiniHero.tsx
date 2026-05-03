import Image from "next/image";

interface MiniHeroProps {
  title: string;
}

export default function MiniHero({ title }: MiniHeroProps) {
  return (
    <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden bg-gray-400 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero section.jpg"
          alt="MT AUTOS Mini Hero"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="font-jost text-4xl font-bold uppercase tracking-wider md:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
