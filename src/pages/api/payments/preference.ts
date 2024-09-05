// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { fetchProduct } from "@/db/products";
import { Product } from "@/pages/api/products";
import { Items } from "mercadopago/dist/clients/commonTypes";

export type Page = {
  id: string,
  title: string,
  slug: string,
  content: any[],
  createdAt: string,
  updatedAt: string
}

const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | Error>
) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

  const {
    id,
    contributionAmount,
    name,
    email,
    message,
  } = req.body;

  const productReq = await fetchProduct(id);
  if (!productReq.document) return res.status(404).json({ message: 'Product not found' });

  const product = productReq.document as Product;

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

  const preference = await new Preference(client).create({
    body: {
      items: [item],
      payer: {
        name,
        email,
      }
    }
  });

  res.status(200).json(preference);
}
