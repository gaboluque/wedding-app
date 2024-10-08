import React from 'react';
import { formatCurrency } from '@/utils/currencyUtils';
import { IProduct } from "@/models/Product";
import { productProgress } from "@/utils/productUtils";

interface ProductDisplayProps {
  product: IProduct;
}

export const ProductCheckoutPreview: React.FC<ProductDisplayProps> = ({ product }) => {
  return (
    <div className="product-item bg-white rounded-sm w-full">
      <div className="flex flex-col items-start gap-4">
        <div className="w-full text-center">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain"/>
        </div>
        <div className="w-full h-full px-4">
          <p className="my-3 text-lg font-semibold">{product.name}</p>
          <p className="my-3 text-lg">{formatCurrency(product.totalAmount)}</p>
          <p>{product.description}</p>
        </div>
        <div className="product-progress h-4 w-full bg-gray-200 rounded-sm">
          <div
            className="px-1 progress-bar h-4 text-xs text-white font-bold text-center bg-green-500"
            style={{ width: `${productProgress(product)}%` }}
          >
            {productProgress(product)}%
          </div>
        </div>
      </div>
    </div>
  );
};
