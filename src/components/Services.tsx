import Link from "next/link";

const services = [
  { title: "Predaj", image: "/predaj.jpeg", link: "/ponuka" },
  { title: "Dovoz", image: "/dovoz.jpg", link: "/dovoz" },
  { title: "Leasing", image: "/leasing.jpg", link: "/leasing" },
  { title: "Výkup", image: "/vykup.webp", link: "/vykup" },
  { title: "Poistenie", image: "/pzp.jpg", link: "/pzp" },
];

export default function Services() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-jost text-5xl font-bold md:text-6xl">NAŠE SLUŽBY</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <Link key={service.title} href={service.link} className="group relative block overflow-hidden rounded-lg">
              <img
                src={service.image}
                alt={service.title}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-jost text-2xl font-bold text-white">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
