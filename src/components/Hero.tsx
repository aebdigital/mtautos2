import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getGoogleReviews } from "@/lib/googleReviews";
import HeroReviewRotator from "./HeroReviewRotator";
import ReviewStars from "./ReviewStars";

export default async function Hero() {
  const reviewsData = await getGoogleReviews();
  const ratingLabel = reviewsData?.rating ? reviewsData.rating.toFixed(1).replace(".", ",") : null;
  const googleUrl = reviewsData?.url ?? "https://www.google.com/search?q=MT+AUTOS+Su%C4%8Dany";

  return (
    <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-gray-400 py-14 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero section.jpg"
          alt="MT AUTOS Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="max-w-4xl text-left">
            {reviewsData ? (
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 inline-flex max-w-full flex-wrap items-center gap-3 rounded-lg border border-white/25 bg-white/15 px-4 py-3 font-montserrat text-sm font-bold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/25"
              >
                <span>Google</span>
                {ratingLabel ? <span className="font-jost text-xl leading-none">{ratingLabel}</span> : null}
                {reviewsData.rating ? (
                  <ReviewStars
                    rating={reviewsData.rating}
                    iconClassName="h-4 w-4"
                    emptyClassName="text-white/35"
                  />
                ) : null}
                {reviewsData.userRatingsTotal ? (
                  <span className="text-white/85">{reviewsData.userRatingsTotal} recenzií</span>
                ) : null}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}

            <h1 className="mb-6 font-jost text-5xl font-bold md:text-6xl xl:text-7xl">
              VÍTAME VÁS V AUTOBAZÁRI
              <br />
              <span className="text-blue-400">MT AUTOS</span>
              <br />
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

          {reviewsData?.reviews.length ? <HeroReviewRotator reviews={reviewsData.reviews} /> : null}
        </div>
      </div>
    </section>
  );
}
