import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import Page, { IPage } from "@/models/Page";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPage[] | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const pages = await Page.fetchPages();

  res.status(200).json(pages);
}
