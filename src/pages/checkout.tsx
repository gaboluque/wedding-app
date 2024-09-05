import { Product } from "@/pages/api/products";
import { NextPageContext } from "next";
import { apiUrl } from "@/config";
import { formatCurrency } from "@/utils/currencyUtils"; // Assuming you already have this utility function
import { useState } from "react";

type CheckoutProps = { product?: Product };

export default function Checkout({ product }: CheckoutProps) {
  const [contribution, setContribution] = useState<string>("");

  if (!product) return <div className="flex justify-center">Producto no encontrado 🥴</div>;

  const remainingAmount = product.totalAmount - ((product.progress || 0) / 100) * product.totalAmount;

  const handleContributeRemaining = () => {
    setContribution(formatCurrency(remainingAmount));
  };

  // Function to handle input and format it as currency
  const handleContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    const numericValue = Number(value) / 100; // Convert the string to a numeric value
    setContribution(formatCurrency(numericValue)); // Format and update the state
  };

  return (
    <div className="checkout">
      <div className="product-item bg-white rounded-sm">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="w-full md:w-1/3 text-center">
            <img src="https://picsum.photos/200" alt={product.name} className="w-full h-48 object-contain" />
          </div>
          <div className="w-full h-full md:w-2/3 px-4">
            <p className="my-3 text-lg font-semibold">
              {formatCurrency(product.totalAmount)}
            </p>
            <p>{product.description}</p>

            <div className="product-progress h-4 w-full bg-gray-200 rounded-sm">
              <div
                className="progress-bar h-4 text-xs text-white font-bold text-center bg-green-500"
                style={{ width: `${Number(product.progress || 0)}%` }}
              >
                {product.progress || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-form mt-8">
        <form className="product-form">
          {/* Contribute Amount */}
          <div className="my-4 flex flex-col md:flex-row md:items-end gap-2">
            <div className="w-full">
              <label htmlFor="contribution" className="block">Contribución</label>
              <input
                type="text"
                name="contribution"
                id="contribution"
                className="input border border-gray-300 rounded w-full p-2"
                value={contribution}
                onChange={handleContributionChange}
                placeholder="Especifica la cantidad que deseas contribuir"
              />
            </div>
            <div className="flex justify-end w-1/3">
              <button
                type="button"
                className="w-full mt-2 md:mt-0 md:ml-2 btn bg-[#a88f68] text-white py-2 px-4 rounded hover:bg-[#8c7856] transition"
                onClick={handleContributeRemaining}
              >
                Contribuir el restante
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="my-4">
            <label htmlFor="name" className="block">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              className="input border border-gray-300 rounded w-full p-2"
              placeholder="Tu nombre"
            />
          </div>

          {/* Email */}
          <div className="my-4">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input border border-gray-300 rounded w-full p-2"
              placeholder="Tu correo electrónico"
            />
          </div>

          {/* Personal Message */}
          <div className="my-4">
            <label htmlFor="message" className="block">Mensaje</label>
            <textarea
              name="message"
              id="message"
              className="input border border-gray-300 rounded w-full p-2"
              placeholder="Escribe un mensaje para los novios"
              rows={4}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="my-4 flex justify-end">
            <button
              type="submit"
              className="btn bg-[#677870] text-white py-2 px-4 rounded hover:bg-[#555e55] transition"
            >
              Contribuir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Checkout.getInitialProps = async (ctx: NextPageContext) => {
  const { productId } = ctx.query;

  try {
    if (!productId) return { product: null };

    const product = await fetch(`${apiUrl}/products/${productId}`).then((res) => res.json());

    if (!product.id) throw new Error("Product not found");

    return { product };
  } catch (error) {
    console.error(error);
    return { product: null };
  }
};
