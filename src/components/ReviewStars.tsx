"use client";

import { Star } from "lucide-react";

interface ReviewStarsProps {
  rating: number;
  className?: string;
  iconClassName?: string;
  fullClassName?: string;
  emptyClassName?: string;
}

export default function ReviewStars({
  rating,
  className = "",
  iconClassName = "h-4 w-4",
  fullClassName = "fill-yellow-400 text-yellow-400",
  emptyClassName = "text-gray-300",
}: ReviewStarsProps) {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className={`flex shrink-0 items-center gap-1 ${className}`} aria-label={`${rating} z 5 hviezdičiek`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${iconClassName} ${index < fullStars ? fullClassName : emptyClassName}`}
        />
      ))}
    </div>
  );
}
