import { ArrowRight } from 'lucide-react';
import type { Restaurant } from '../types/restaurant';
import { ReviewList } from './ReviewList';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 flex w-full">

      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden mr-4">
        {restaurant.photo_url ? (
          <img
            src={restaurant.photo_url}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            Aucune image
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between items-start">

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
              <p className="text-gray-500 text-sm">{restaurant.address}</p>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800 bg-opacity-50 text-gray-100 mt-2">
                {restaurant.type}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <div
                className={`text-xl font-semibold ${
                  restaurant.rating < 3 ? 'text-red-500' : 'text-orange-500'
                }`}
              >
                {restaurant.rating}
              </div>
              <div className="text-sm text-gray-400">
                ({restaurant.user_ratings_total} avis)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <a
            href={restaurant.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors duration-200"
          >
            Voir sur Google Maps
            <ArrowRight className="w-5 h-5 ml-2 text-blue-500" />
          </a>
        </div>

        <ReviewList reviews={restaurant.reviews} />
      </div>
    </div>
  );
}
