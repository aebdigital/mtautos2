import { getGoogleReviews } from "@/lib/googleReviews";
import GoogleReviewsSlider from "./GoogleReviewsSlider";

export default async function GoogleReviews() {
  const reviewsData = await getGoogleReviews();

  if (!reviewsData || reviewsData.reviews.length === 0) {
    return null;
  }

  return <GoogleReviewsSlider reviewsData={reviewsData} />;
}
