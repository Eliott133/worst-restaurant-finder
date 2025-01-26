import { Search, MapPin } from 'lucide-react';

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  radius: number;
  setRadius: (radius: number) => void;
  restaurantType: string;
  setRestaurantType: (type: string) => void;
  onSearch: () => void;
}

export function SearchForm({
  city,
  setCity,
  radius,
  setRadius,
  restaurantType,
  setRestaurantType,
  onSearch,
}: SearchFormProps) {
  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-8 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-12 bg-transparent border"
              placeholder="Entrez une ville..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de Restaurant</label>
          <select
            value={restaurantType}
            onChange={(e) => setRestaurantType(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-12 bg-transparent border"
          >
            <option value="">Sélectionnez un type</option>
            {/* Liste des types de restaurant */}
            <option value="kebab">Kebab</option>
            <option value="italien">Italien</option>
            <option value="burger">Burger</option>
            <option value="pizzeria">Pizzeria</option>
            <option value="sushi">Sushi</option>
            <option value="fast-food">Fast-food</option>
            <option value="crêperie">Crêperie</option>
            <option value="boulangerie">Boulangerie</option>
            <option value="pâtisserie">Pâtisserie</option>
            <option value="sandwicherie">Sandwicherie</option>
            <option value="japonais">Japonais</option>
            <option value="chinois">Chinois</option>
            <option value="mexicain">Mexicain</option>
            <option value="indien">Indien</option>
            <option value="français">Français</option>
            <option value="thaïlandais">Thaïlandais</option>
            <option value="vietnamien">Vietnamien</option>
            <option value="américain">Américain</option>
            <option value="grec">Grec</option>
            <option value="libanais">Libanais</option>
            <option value="coréen">Coréen</option>
            <option value="africain">Africain</option>
            <option value="végétarien">Végétarien</option>
            <option value="végétalien">Végétalien</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rayon (km)</label>
          <input
            type="range"
            min="1"
            max="20"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <span className="text-sm text-gray-500 mt-1 block">{radius} km</span>
        </div>

        <div className='flex items-center'>
          <button
            type="button"
            onClick={onSearch}
            className="w-full cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-medium shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
          >
            <Search className="w-5 h-5 mr-2" />
            Rechercher
          </button>
        </div>
      </div>

    </div>
  );
}
