interface MiniHeroProps {
  title: string;
}

export default function MiniHero({ title }: MiniHeroProps) {
  return (
    <section className="relative flex min-h-[20vh] items-center justify-center bg-gray-400 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url("/hero section.jpg")',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <h1 className="font-jost text-5xl font-bold text-center">{title}</h1>
      </div>
    </section>
  );
}
