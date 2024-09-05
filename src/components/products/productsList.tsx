import { Product } from "@/pages/api/products";
import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/router";
import { formatCurrency } from "@/utils/currencyUtils";


export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleBuyProduct = async () => {
    await router.push('/checkout?productId=' + selectedProduct?.id);
  }

  return (
    <div className="products-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div
          key={product.id}
          className="product-item border rounded-sm shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow hover:cursor-pointer"
          onClick={() => setSelectedProduct(product)}
        >
          <img
            src="https://picsum.photos/200"
            alt={product.name}
            className="w-full h-48 object-contain"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-500">{formatCurrency(product.totalAmount)}</p>
          </div>
          <div className="product-progress h-4">
            <div
              className="progress-bar h-4 text-xs text-white font-bold text-center"
              style={{ width: `${Number(product.progress || 0)}%` }}
            >
              {product.progress || 0}%
            </div>
          </div>
        </div>
      ))}
      {selectedProduct && (
        <Modal title={selectedProduct.name} open={!!selectedProduct} onClose={() => setSelectedProduct(null)} containerProps={{ style: { maxWidth: '400px' } }}>
          <div className="p-4">
            <img src="https://picsum.photos/200" alt={selectedProduct.name} className="w-full h-48 object-contain"/>
            <p className="my-3">
              {formatCurrency(selectedProduct.totalAmount)}
            </p>
            <p>{selectedProduct.description}</p>

            <div className="flex justify-end mt-4">
              <button className="rounded-sm" onClick={handleBuyProduct}>
                Aportar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
