import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/router";
import { formatCurrency } from "@/utils/currencyUtils";
import { IProduct } from "@/models/Product";
import { productProgress } from "@/utils/productUtils";


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

  console.log(products);

  if (loading) {
    return (
      <div className="text-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="px-5 products-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map(product => (
        <div
          key={product.id}
          className="product-item bg-[#F6F1EA] rounded-lg overflow-hidden hover:cursor-pointer transition-all"
          onClick={() => productProgress(product) === "100" ? null : setSelectedProduct(product)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-fit bg-white"
          />
          <div className="p-4">
            <h3 className="text-sm h-[50px] font-bold mb-2">
              {product.name.length > 40 ? product.name.slice(0, 40) + '...' : product.name}
            </h3>
            <p className="text-gray-500">{formatCurrency(product.totalAmount)}</p>
            <div className="progress-container flex flex-row gap-2">
              <div className="product-progress rounded-2xl h-3 w-5/6">
                <div
                  className="px-1 rounded-2xl progress-bar h-3 text-xs text-white font-bold text-center"
                  style={{ width: `${productProgress(product)}%` }}
                >
                </div>
              </div>
              <span className="h-3 w-1/6 text-md leading-[10px]">{productProgress(product) || 0}%</span>
            </div>
            <div className="flex justify-center">
              <button className={`rounded-sm mt-4 ${productProgress(product) === "100" ? 'bg-gray-400' : ''}`}>
                {productProgress(product) === "100" ? 'Completado' : 'Aportar'}
              </button>
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
