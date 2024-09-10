// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import Product, { IProduct } from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct[] | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const products = await Product.fetchProducts();

  res.status(200).json(products);
}
