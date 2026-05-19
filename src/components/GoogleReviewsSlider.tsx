"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import type { GoogleReviewsData } from "@/lib/googleReviews";
import { limitReviewText } from "@/lib/reviewText";
import ReviewStars from "./ReviewStars";

interface GoogleReviewsSliderProps {
  reviewsData: GoogleReviewsData;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function GoogleReviewsSlider({ reviewsData }: GoogleReviewsSliderProps) {
  const reviews = useMemo(() => reviewsData.reviews, [reviewsData.reviews]);
  const sliderReviews = useMemo(() => (reviews.length > 1 ? [...reviews, ...reviews] : reviews), [reviews]);
  const ratingLabel = reviewsData.rating ? reviewsData.rating.toFixed(1).replace(".", ",") : null;
  const googleUrl = reviewsData.url ?? "https://www.google.com/search?q=MT+AUTOS+Su%C4%8Dany";
  const trackStyle = {
    "--review-marquee-duration": `${Math.max(24, reviews.length * 6)}s`,
  } as CSSProperties;

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-montserrat text-sm font-bold uppercase tracking-[0.2em] text-red-600">
              Google recenzie
            </p>
            <h2 className="font-jost text-4xl font-bold text-gray-950 md:text-5xl">Čo hovoria zákazníci</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {ratingLabel ? (
              <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-4 shadow-sm ring-1 ring-gray-200">
                <span className="font-jost text-3xl font-bold text-gray-950">{ratingLabel}</span>
                <div>
                  <ReviewStars rating={reviewsData.rating ?? 0} />
                  {reviewsData.userRatingsTotal ? (
                    <p className="mt-1 font-montserrat text-sm text-gray-500">
                      {reviewsData.userRatingsTotal} hodnotení
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 font-montserrat text-sm font-bold text-white transition-colors hover:bg-red-600"
            >
              Zobraziť na Google
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="review-marquee relative overflow-hidden">
          <div
            className="review-marquee-track flex w-max gap-5"
            style={trackStyle}
            aria-label="Google recenzie zákazníkov"
          >
            {sliderReviews.map((review, index) => (
              <div key={`${review.authorName}-${review.time ?? index}-${index}`} className="review-marquee-card shrink-0">
                <article className="flex h-full min-h-[270px] flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600 font-jost text-sm font-bold text-white">
                        {getInitials(review.authorName) || "G"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-jost text-xl font-bold text-gray-950">{review.authorName}</h3>
                        {review.relativeTimeDescription ? (
                          <p className="font-montserrat text-sm text-gray-500">{review.relativeTimeDescription}</p>
                        ) : null}
                      </div>
                    </div>
                    <ReviewStars rating={review.rating} />
                  </div>

                  {review.text ? (
                    <p className="line-clamp-5 font-montserrat text-sm leading-7 text-gray-600">
                      {limitReviewText(review.text, 190)}
                    </p>
                  ) : (
                    <p className="font-montserrat text-sm leading-7 text-gray-600">
                      Zákazník pridal hodnotenie na Google.
                    </p>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
