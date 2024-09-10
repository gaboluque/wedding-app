import { NextApiRequest, NextApiResponse } from "next";
import { Error } from "@/pages/api/helpers";
import Product, { IProduct } from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { id } = req.query;
  if (id === undefined) return res.status(400).json({ message: 'Missing id' });


  const product = await Product.fetchProduct(id as string);

  res.status(200).json(product || { message: 'Product not found' });
}
