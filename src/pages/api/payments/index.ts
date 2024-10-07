import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import Page, { IPage } from "@/models/Page";
import Payment, { IPayment } from "@/models/Payment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPayment[] | Error>
) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const payments = await Payment.fetchPayments();

  res.status(200).json(payments);
}
