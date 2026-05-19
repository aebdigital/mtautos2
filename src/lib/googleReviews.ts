import { unstable_cache } from "next/cache";

export type GoogleReview = {
  authorName: string;
  authorUrl?: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
  time?: number;
};

export type GoogleReviewsData = {
  name: string;
  rating: number | null;
  userRatingsTotal: number | null;
  url: string | null;
  reviews: GoogleReview[];
};

type GooglePlacesReview = {
  author_name?: string;
  author_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type GooglePlacesDetailsResponse = {
  status: string;
  error_message?: string;
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: GooglePlacesReview[];
  };
};

const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJFQVgdof_FEcRL5nnC5qDaLg";
const GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/details/json";

async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey || !GOOGLE_PLACE_ID) {
    return null;
  }

  const url = new URL(GOOGLE_PLACES_API_URL);
  url.searchParams.set("place_id", GOOGLE_PLACE_ID);
  url.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("language", "sk");
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      console.error(`Google reviews request failed: ${response.status}`);
      return null;
    }

    const data = (await response.json()) as GooglePlacesDetailsResponse;

    if (data.status !== "OK" || !data.result) {
      console.error(`Google reviews request returned ${data.status}: ${data.error_message ?? "No details"}`);
      return null;
    }

    const reviews = (data.result.reviews ?? [])
      .filter((review) => review.author_name && typeof review.rating === "number")
      .map((review) => ({
        authorName: review.author_name ?? "Google používateľ",
        authorUrl: review.author_url,
        rating: review.rating ?? 0,
        relativeTimeDescription: review.relative_time_description ?? "",
        text: review.text ?? "",
        time: review.time,
      }))
      .sort((a, b) => (b.time ?? 0) - (a.time ?? 0));

    return {
      name: data.result.name ?? "MT AUTOS",
      rating: data.result.rating ?? null,
      userRatingsTotal: data.result.user_ratings_total ?? null,
      url: data.result.url ?? null,
      reviews,
    };
  } catch (error) {
    console.error("Unable to load Google reviews", error);
    return null;
  }
}

export const getGoogleReviews = unstable_cache(fetchGoogleReviews, ["google-reviews", GOOGLE_PLACE_ID], {
  revalidate: 60 * 60,
});
