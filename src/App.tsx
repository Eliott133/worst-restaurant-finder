import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { Map } from './components/Map';
import { RestaurantList } from './components/RestaurantList';
import { loadGoogleMapsScript, searchRestaurants } from './utils/maps';
import type { Restaurant } from './types/restaurant';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [radius, setRadius] = useState(5);
  const [restaurantType, setRestaurantType] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Charger le script Google Maps au démarrage
    loadGoogleMapsScript(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '')
      .catch((err) => {
        console.error('Erreur lors du chargement de Google Maps:', err);
        setError('Impossible de charger Google Maps');
      });
  }, []);

  const handleSearch = async () => {
    if (!city || !restaurantType) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchRestaurants(city, radius, restaurantType);
      setRestaurants(results);
      
      if (results.length === 0) {
        setError('Aucun restaurant trouvé avec ces critères');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError('Erreur lors de la recherche des restaurants');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <SearchForm
          city={city}
          setCity={setCity}
          radius={radius}
          setRadius={setRadius}
          restaurantType={restaurantType}
          setRestaurantType={setRestaurantType}
          onSearch={handleSearch}
        />

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 min-h-[600px]">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Recherche en cours...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-[600px]">
            <div className="order-2 lg:order-1">
              <Map 
                restaurants={restaurants}
                center={restaurants[0]?.location}
              />
            </div>
            <div className="order-1 lg:order-2 overflow-y-auto max-h-[600px]">
              <RestaurantList restaurants={restaurants} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;