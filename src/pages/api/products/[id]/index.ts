import { NextApiRequest, NextApiResponse } from "next";
import { Error } from "@/pages/api/helpers";
import { Page } from "@/pages/api/pages";
import { fetchProduct } from "@/pages/api/db/products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Page | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { id } = req.query;
  if (id === undefined) return res.status(400).json({ message: 'Missing id' });


  const dbRes = await fetchProduct(id as string);
  if (!dbRes.document) return res.status(404).json({ message: 'Page not found' });

  res.status(200).json(dbRes.document);
}
