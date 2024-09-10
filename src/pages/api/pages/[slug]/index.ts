import { NextApiRequest, NextApiResponse } from "next";
import { Error } from "@/pages/api/helpers";
import Page, { IPage } from "@/models/Page";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPage | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { slug } = req.query;
  if (slug === undefined) return res.status(400).json({ message: 'Missing slug' });

  const page = await Page.fetchPage(slug as string);

  res.status(200).json(page || { message: 'Page not found' });
}
