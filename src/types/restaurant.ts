import type { Review } from "./review";

export type Restaurant = {
    id: string;
    name: string;
    rating: number;
    address: string;
    type: string;
    user_ratings_total: number;
    link: string;
    photo_url: string | null;
    location: {
      lat: number;
      lng: number;
    };
    reviews: Review[];
  };