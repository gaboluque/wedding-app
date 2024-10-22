import { NextApiRequest, NextApiResponse } from "next";
import { Error } from "@/pages/api/helpers";
import Product, { IProduct } from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProduct | Error>
) {
  if(req.method === 'GET') {
    const { id } = req.query;
    if (id === undefined) return res.status(400).json({ message: 'Missing id' });


    const product = await Product.fetchProduct(id as string);

    return res.status(200).json(product || { message: 'Product not found' });
  }

  if(req.method === 'PUT') {
    const { id } = req.query;
    if (id === undefined) return res.status(400).json({ message: 'Missing id' });

    let product = await Product.fetchProduct(id as string);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { progress } = req.body;
    if (progress === undefined) return res.status(400).json({ message: 'Missing progress' });

    await Product.setProgress(id as string, progress);
    product = await Product.fetchProduct(id as string);

    return res.status(200).json(product || { message: 'Product not found' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
