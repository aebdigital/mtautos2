import Link from "next/link";
import type { ReactNode } from "react";
import MiniHero from "./MiniHero";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

interface Step {
  step: string;
  title: string;
  desc: string;
}

interface ServicePageProps {
  heroTitle: string;
  heading: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  accentTextClass: string;
  accentBgClass: string;
  ctaGradientClass: string;
  features: Feature[];
  steps: Step[];
  ctaTitle: string;
  ctaText: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function ServicePage({
  heroTitle,
  heading,
  intro,
  image,
  imageAlt,
  accentTextClass,
  accentBgClass,
  ctaGradientClass,
  features,
  steps,
  ctaTitle,
  ctaText,
  ctaHref = "/kontakt",
  ctaLabel = "Kontaktujte nás",
}: ServicePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <MiniHero title={heroTitle} />

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-jost text-4xl font-bold md:text-5xl">{heading}</h2>
            <p className="mx-auto max-w-3xl font-montserrat text-lg leading-relaxed text-gray-600">{intro}</p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-lg border border-gray-100 bg-gray-50 p-6 transition-shadow hover:shadow-lg">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${accentBgClass} ${accentTextClass}`}>
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 font-jost text-xl font-bold">{feature.title}</h3>
                  <p className="font-montserrat leading-relaxed text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <img src={image} alt={imageAlt} className="h-[420px] w-full rounded-lg object-cover shadow-xl" />
              <div className={`absolute -bottom-6 -right-6 rounded-lg bg-black p-6 text-white shadow-xl md:p-8`}>
                <div className="font-jost text-4xl font-bold">MT</div>
                <div className="font-montserrat text-sm uppercase tracking-wide">AUTOS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-jost text-4xl font-bold">Ako to funguje?</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mb-4 font-jost text-6xl font-bold text-gray-200">{item.step}</div>
                <h3 className="mb-3 font-jost text-xl font-bold">{item.title}</h3>
                <p className="font-montserrat text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`bg-gradient-to-r ${ctaGradientClass} py-20 text-white`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-jost text-4xl font-bold">{ctaTitle}</h2>
          <p className="mx-auto mb-10 max-w-2xl font-montserrat text-xl text-white/90">{ctaText}</p>
          <Link href={ctaHref} className="inline-block rounded-lg bg-white px-10 py-4 font-montserrat text-lg font-bold text-black transition-colors hover:bg-gray-100">
            {ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
