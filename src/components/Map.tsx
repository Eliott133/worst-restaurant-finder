import { useEffect, useRef } from 'react';
import type { Restaurant } from '../types/restaurant';

interface MapProps {
  restaurants: Restaurant[];
  center?: { lat: number; lng: number };
}

export function Map({ restaurants, center }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!googleMapRef.current) {
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          zoom: 13,
          center: center || { lat: 48.8566, lng: 2.3522 }, // Paris par défaut
        });
      }

      // Nettoyer les anciens marqueurs
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Ajouter les nouveaux marqueurs
      restaurants.forEach((restaurant) => {
        const marker = new window.google.maps.Marker({
          position: restaurant.location,
          map: googleMapRef.current,
          title: restaurant.name,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
              <div class="p-2">
                <h3 class="font-semibold">${restaurant.name}</h3>
                <p class="text-sm text-gray-600">${restaurant.address}</p>
                <p class="text-sm font-semibold ${restaurant.rating < 3 ? 'text-red-500' : 'text-orange-500'
            }">Note: ${restaurant.rating}</p>
              </div>
            `,
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });

        markersRef.current.push(marker);
      });

      // Centrer la carte sur le premier restaurant s'il existe
      if (restaurants.length > 0 && googleMapRef.current) {
        googleMapRef.current.setCenter(restaurants[0].location);
      }
    };

    if (window.google) {
      initMap();
    }
  }, [restaurants, center]);

  /*useEffect(() => {
    const loadMap = () => {
      if (mapRef.current && window.google) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 48.8566, lng: 2.3522 },
          zoom: 11,
        });
      }
    };

    if (window.google) {
      loadMap();
    }
  }, []);*/


  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[600px]">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}