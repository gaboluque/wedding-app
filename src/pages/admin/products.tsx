import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/currencyUtils";
import { IProduct } from "@/models/Product";
import { productProgress } from "@/utils/productUtils";


export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [updatedProgress, setUpdatedProgress] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const selectProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setUpdatedProgress(product.progress || 0);
  }

  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpdatedProgress(parseInt(value));
  }

  const updateProduct = () => {

    if (!selectedProduct || updatedProgress === null) return;

    fetch(`/api/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ progress: updatedProgress })
    })
      .then(res => res.json())
      .then((data: IProduct) => {
        setProducts(products.map(product => product.id === data.id ? data : product));
      })
      .catch(console.error)
      .finally(() => {
        setSelectedProduct(null);
        setUpdatedProgress(null);
      });
  }

  return (
    <main className="products">
      <h3 className="text-center mb-5">Products</h3>
      <table className="table-auto w-full">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Valor</th>
          <th>Progreso $$</th>
          <th>Progreso %</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {
          products.map(product => (
            <tr key={product.id}>
              <td className="w-72">{product.name || ""}</td>
              <td className="text-center w-44">{formatCurrency(product.totalAmount)}</td>
              <td className="text-center w-72">
                {
                  selectedProduct?.id === product.id
                    ? <input type="text" value={updatedProgress || 0} onChange={onProgressChange}/>
                    : formatCurrency(product.progress || 0)
                }
              </td>
              <td className="text-center w-72">{productProgress(product) || 0}%</td>
              <td className="text-center">
                {
                  selectedProduct === product
                    ? <button className="text-white px-3 py-1 rounded-sm" onClick={updateProduct}>Guardar</button>
                    : <button className="text-white px-3 py-1 rounded-sm"
                              onClick={() => selectProduct(product)}>Editar</button>
                }
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </main>
  )
}
