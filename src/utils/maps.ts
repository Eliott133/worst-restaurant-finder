import type { Restaurant } from '../types/restaurant';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export async function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      console.log("Google Maps API déjà chargée.");
      return resolve();
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;

    script.onerror = () => reject(new Error("Échec du chargement du script Google Maps."));

    window.initMap = () => {
      resolve();
    };

    document.head.appendChild(script);
    //console.log("Script Google Maps ajouté avec loading=async.");
  });
}

export async function searchRestaurants(
  city: string,
  radius: number,
  type: string
): Promise<Restaurant[]> {
  const geocoder = new window.google.maps.Geocoder();

  // Convertir la ville en coordonnées
  const geocodeResponse = await new Promise<{ results: any[] }>((resolve, reject) => {
    geocoder.geocode({ address: city }, (results: any, status: string) => {
      if (status === 'OK') {
        resolve({ results });
      } else {
        reject(new Error('Ville non trouvée'));
      }
    });
  });

  // Extraire les résultats après avoir récupéré la réponse
  const { results } = geocodeResponse;

  if (!results || results.length === 0) {
    throw new Error('Aucun résultat de géocodage trouvé');
  }


  const location = results[0].geometry.location; // contient les coordonnées latitude et longitude
  console.log(`Coordonnées de la ville: ${results[0].formatted_address} : ${location}`);
  const service = new window.google.maps.places.PlacesService(
    document.createElement('div')
  );

  // Rechercher les restaurants
  const places = await new Promise<any[]>((resolve, reject) => {
    service.nearbySearch(
      {
        location,
        radius: radius * 1000,
        type: 'restaurant',
        keyword: type,
      },
      (results: any, status: string) => {
        if (status === 'OK') {
          resolve(results);
        } else {
          reject(new Error('Aucun restaurant trouvé'));
        }
      }
    );
  });

  //console.log('Résultats de recherche:', places);

  // Obtenir les détails pour chaque restaurant
  const detailedPlaces = await Promise.all(
    places.map(
      (place) =>
        new Promise((resolve, reject) => {
          service.getDetails(
            { placeId: place.place_id, fields: ['name', 'rating', 'formatted_address', 'geometry', 'user_ratings_total', 'types', 'photos', 'place_id', 'reviews'], reviews_sort: "newest" },
            (result: any, status: string) => {
              if (status === 'OK') {
                resolve(result);
              } else {
                reject(new Error('Impossible de récupérer les détails'));
              }
            }
          );
        })
    )
  );

  //console.log('Résultats détaillés:', detailedPlaces);

  // Filtrer et formater les résultats
return detailedPlaces
  .filter((place: any) => place.rating && place.rating < 3.5)
  .map((place: any) => ({
    id: place.place_id,
    name: place.name,
    rating: place.rating,
    address: place.formatted_address,
    type,
    user_ratings_total: place.user_ratings_total,
    link: "https://www.google.com/maps/place/?q=place_id:" + place.place_id,
    photo_url: place.photos && place.photos.length > 0 
      ? place.photos[0].getUrl({ maxWidth: 400 })
      : null,
    location: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    },
    reviews: place.reviews?.map((review: any) => ({
      author_name: review.author_name,
      language: review.language,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time,
    })) || [],
  }))
  .sort((a, b) => {
    if (a.rating !== b.rating) {
      return a.rating - b.rating;
    }
    return a.user_ratings_total - b.user_ratings_total;
  });
}
