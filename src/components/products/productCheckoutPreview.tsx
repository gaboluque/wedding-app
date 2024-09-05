import React from 'react';
import { formatCurrency } from '@/utils/currencyUtils';
import { Product } from "@/pages/api/products";

interface ProductDisplayProps {
  product: Product;
}

export const ProductCheckoutPreview: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    <div className="product-item bg-white rounded-sm w-full">
      <div className="flex flex-col items-start gap-4">
        <div className="w-full text-center">
          <img src="https://picsum.photos/200" alt={product.name} className="w-full h-48 object-contain"/>
        </div>
        <div className="w-full h-full px-4">
          <p className="my-3 text-lg font-semibold">{product.name}</p>
          <p className="my-3 text-lg">{formatCurrency(product.totalAmount)}</p>
          <p>{product.description}</p>
        </div>
        <div className="product-progress h-4 w-full bg-gray-200 rounded-sm">
          <div
            className="px-1 progress-bar h-4 text-xs text-white font-bold text-center bg-green-500"
            style={{ width: `${Number(product.progress || 0)}%` }}
          >
            {product.progress || 0}%
          </div>
        </div>
      </div>
    </div>
  );
};
