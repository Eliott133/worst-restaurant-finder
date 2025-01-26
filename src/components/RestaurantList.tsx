import { RestaurantCard } from './RestaurantCard';
import type { Restaurant } from '../types/restaurant';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Restaurants les moins bien notés
      </h2>
      <div className="space-y-4">
        {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
        ) : (
          <p>Les pires restaurant s'afficheront ici</p>
        )}
      </div>
    </div>
  );
}