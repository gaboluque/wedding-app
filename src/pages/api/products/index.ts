// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import { fetchPages } from "@/pages/api/db/pages";
import { fetchProducts } from "@/pages/api/db/products";

export type Product = {
  id: string,
  name: string,
  description: string,
  totalAmount: number,
  imageUrl: string,
  progress: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const dbRes = await fetchProducts({
    projection: {
      _id: 0,
      id: {$toString: "$_id" },
      name: 1,
      description: 1,
      totalAmount: 1,
      imageUrl: 1,
      progress: 1
    }
  });

  res.status(200).json(dbRes.documents);
}
