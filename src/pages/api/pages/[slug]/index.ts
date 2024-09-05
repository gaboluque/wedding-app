import { NextApiRequest, NextApiResponse } from "next";
import { Error } from "@/pages/api/helpers";
import { Page } from "@/pages/api/pages";
import { fetchPage } from "@/db/pages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Page | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { slug } = req.query;
  if (slug === undefined) return res.status(400).json({ message: 'Missing slug' });

  const dbRes = await fetchPage(slug as string);
  if (!dbRes.document) return res.status(404).json({ message: 'Page not found' });

  res.status(200).json(dbRes.document);
}
