'use client';

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Product } from "@/pages/api/products";
import { createPaymentPreference } from "@/services/payments/createPaymentPreference";
import { ProductCheckoutPreview } from "@/components/products/productCheckoutPreview";
import { NextPageContext } from "next";
import { apiUrl } from "@/config";

type CheckoutProps = {
  product: Product | null;
};

const Checkout = ({ product }: CheckoutProps) => {
  const [preferenceId, setPreferenceId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletReady, setWalletReady] = useState(false);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "", { locale: 'es-CO' });
  }, []);

  useEffect(() => {
    if (preferenceId && walletReady) {

      setTimeout(() => {
        const wallet = document.querySelector('.mercadopago-wallet-container button');
        if (wallet) {
          // @ts-ignore
          wallet.click();
        }
      }, 1000);
    }
  }, [preferenceId, walletReady]);

  const remainingAmount = useMemo(() => {
    if (!product) return 0;
    return product.totalAmount - ((product.progress || 0) / 100) * product.totalAmount;
  }, [product]);

  const handleSubmit = useCallback(async (formData: Record<string, any>) => {
    if (loading || !product) return;

    try {
      setLoading(true);
      setError(null);
      const contributionAmount = Number(formData.contribution.replace(/\D/g, ""));
      const preference = await createPaymentPreference({
        id: product.id,
        contributionAmount,
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setPreferenceId(preference.id);
    } catch (error) {
      console.error("Error creating payment preference:", error);
      setError("Error al procesar el pago. Por favor, inténtalo de nuevo.");
    }
  }, [loading, product]);

  if (!product) {
    return <div className="flex justify-center">Producto no encontrado 🥴</div>;
  }

  return (
    <div className="checkout p-4 md:gap-8 md:flex md:flex-row">
      <div className="w-full md:w-1/2 flex items-center">
        <ProductCheckoutPreview product={product}/>
      </div>
      <div className="w-full md:w-1/2">
        <div className="checkout-form mt-8 md:mt-0">
          <CheckoutForm
            remainingAmount={remainingAmount}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {error && <p className="mt-4 text-red-600">{error}</p>}
          {preferenceId && (
            <div className="mercadopago-wallet-container hidden">
              <Wallet initialization={{ preferenceId }} onReady={() => setWalletReady(true)}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Use async function to fetch product details
Checkout.getInitialProps = async (ctx: NextPageContext) => {
  const { productId } = ctx.query;

  if (!productId) return { product: null };

  try {
    const product = await fetch(`${apiUrl}/products/${productId}`).then(res => res.json());
    if (!product.id) throw new Error("Product not found");

    return { product };
  } catch (error) {
    console.error(error);
    return { product: null };
  }
};

export default Checkout;
