import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/router";
import { formatCurrency } from "@/utils/currencyUtils";
import { IProduct } from "@/models/Product";


export const ProductsList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleBuyProduct = async () => {
    await router.push('/checkout?productId=' + selectedProduct?.id);
  }

  if (loading) {
    return (
      <div className="text-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="px-5 products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div
          key={product.id}
          className="product-item bg-[#F6F1EA] rounded-lg overflow-hidden hover:cursor-pointer transition-all"
          onClick={() => setSelectedProduct(product)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-sm h-[50px] font-bold mb-2">
              {product.name.length > 40 ? product.name.slice(0, 40) + '...' : product.name}
            </h3>
            <p className="text-gray-500">{formatCurrency(product.totalAmount)}</p>
          </div>
          <div className="product-progress h-4">
            <div
              className="px-1 progress-bar h-4 text-xs text-white font-bold text-center"
              style={{ width: `${Number(product.progress || 0)}%` }}
            >
              {product.progress || 0}%
            </div>
          </div>
        </div>
      ))}
      {selectedProduct && (
        <Modal title={selectedProduct.name} open={!!selectedProduct} onClose={() => setSelectedProduct(null)}
               containerProps={{ style: { maxWidth: '400px' } }}>
          <div className="p-4">
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-48 object-contain"/>
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
