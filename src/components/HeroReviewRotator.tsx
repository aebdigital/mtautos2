"use client";

import { useEffect, useMemo, useState } from "react";
import type { GoogleReview } from "@/lib/googleReviews";
import { limitReviewText } from "@/lib/reviewText";
import ReviewStars from "./ReviewStars";

interface HeroReviewRotatorProps {
  reviews: GoogleReview[];
}

export default function HeroReviewRotator({ reviews }: HeroReviewRotatorProps) {
  const visibleReviews = useMemo(() => reviews, [reviews]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = visibleReviews[activeIndex] ?? visibleReviews[0];

  useEffect(() => {
    if (visibleReviews.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleReviews.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [visibleReviews.length]);

  if (!activeReview) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-white/25 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-md md:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-jost text-xl font-bold">{activeReview.authorName}</p>
          {activeReview.relativeTimeDescription ? (
            <p className="font-montserrat text-sm text-white/75">{activeReview.relativeTimeDescription}</p>
          ) : null}
        </div>
        <ReviewStars
          rating={activeReview.rating}
          iconClassName="h-4 w-4"
          emptyClassName="text-white/35"
        />
      </div>

      {activeReview.text ? (
        <p className="line-clamp-5 min-h-32 font-montserrat text-base leading-7 text-white/90">
          {limitReviewText(activeReview.text, 170)}
        </p>
      ) : (
        <p className="min-h-32 font-montserrat text-base leading-7 text-white/90">
          Zákazník pridal hodnotenie na Google.
        </p>
      )}

      {visibleReviews.length > 1 ? (
        <div className="mt-5 flex items-center gap-2">
          {visibleReviews.map((review, index) => (
            <button
              key={`${review.authorName}-${review.time ?? index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
              }`}
              aria-label={`Zobraziť recenziu ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </aside>
  );
}
