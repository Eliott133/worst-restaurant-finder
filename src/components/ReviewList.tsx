import { useState } from 'react';
import type { Review } from '../types/review'; // Assumez que le type Review est défini comme décrit précédemment.

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [showAll, setShowAll] = useState(false);

  if (reviews.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        Aucun avis disponible pour cet établissement.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-900">Avis des clients :</h4>
      <ul className="space-y-4 mt-2">
        {reviews.slice(0, showAll ? reviews.length : 1).map((review, index) => (
          <li key={index} className="border-t pt-4">
            <div className="flex items-center space-x-4">
              <div>
                <h5 className="text-sm font-bold text-gray-900">
                  {review.author_name}
                </h5>
                <p className="text-xs text-gray-500">
                  {review.relative_time_description}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700">{review.text}</p>
          </li>
        ))}
      </ul>

      {reviews.length > 1 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors cursor-pointer"
        >
          {showAll ? 'Réduire' : 'Tout voir'}
        </button>
      )}
    </div>
  );
}
