import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../Products/ProductCard';

interface UserActivityListProps {
  title: string;
  subtitle: string;
  products: Product[];
  emptyMessage: string;
}

export const UserActivityList: React.FC<UserActivityListProps> = ({
  title,
  subtitle,
  products,
  emptyMessage,
}) => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showBidStatus
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{emptyMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
