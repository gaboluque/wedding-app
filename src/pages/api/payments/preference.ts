import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { Payer } from "mercadopago/dist/clients/payment/commonTypes";
import MercadoPagoClient from "@/models/MercadoPagoClient";
import Product from "@/models/Product";
import Payment, { IPayment } from "@/models/Payment";
import { OptionalId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | Error>
) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const {
    id,
    contributionAmount,
    name,
    email,
    message,
  } = req.body;

  const product = await Product.fetchProduct(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (!contributionAmount) return res.status(400).json({ message: 'Contribution amount is required' });
  if(Number.isInteger(contributionAmount) && contributionAmount <= 0) return res.status(400).json({ message: 'Contribution amount must be greater than 0' });

  const item: Items = {
    id: product.id,
    title: product.name,
    quantity: 1,
    unit_price: Number(contributionAmount),
    description: product.description,
    picture_url: product.imageUrl,
  }

  const payer: Payer = {
    first_name: name,
    email,
  }

  const preference = await MercadoPagoClient.createPreference(item, payer);

  if(!preference || !preference.id) return res.status(500).json({ message: 'Failed to create preference' });

  const paymentDTO = {
    product: product.id,
    amount: contributionAmount,
    name,
    email,
    comment: message,
    preferenceId: preference.id
  } as OptionalId<IPayment>;

  const payment = await Payment.createPayment(paymentDTO);

  if(!payment) return res.status(500).json({ message: 'Failed to create payment' });

  res.status(200).json(preference);
}
