// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import { fetchPages } from "@/db/pages";

export type Page = {
  id: string,
  title: string,
  slug: string,
  content: any[],
  createdAt: string,
  updatedAt: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Page[] | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const dbRes = await fetchPages({
    projection: {
      _id: 0,
      id: {$toString: "$_id" },
      title: 1,
      slug: 1
    }
  });

  res.status(200).json(dbRes.documents);
}
