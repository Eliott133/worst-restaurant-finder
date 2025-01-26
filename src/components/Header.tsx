import { Utensils } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Utensils className="w-6 h-6 text-red-500" />
          Restaurant Finder
        </h1>
      </div>
    </header>
  );
}