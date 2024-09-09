// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | Error>
) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });


  // {
  //   action: 'payment.updated',
  //   api_version: 'v1',
  //   data: { id: '123456' },
  //   date_created: '2021-11-01T02:02:02Z',
  //   id: '123456',
  //   live_mode: false,
  //   type: 'payment',
  //   user_id: 92583849
  // }
  //Webhook received: {
  //   action: 'payment.created',
  //   api_version: 'v1',
  //   data: { id: '86797561197' },
  //   date_created: '2024-09-06T00:06:48Z',
  //   id: 115682985766,
  //   live_mode: true,
  //   type: 'payment',
  //   user_id: '92583849'
  // }

  // Webhook received: {
  //   action: 'payment.updated',
  //   api_version: 'v1',
  //   data: { id: '86797561197' },
  //   date_created: '2024-09-06T00:06:48Z',
  //   id: 115638983641,
  //   live_mode: true,
  //   type: 'payment',
  //   user_id: '92583849'
  // }

  //Webhook received: {
  //   action: 'payment.updated',
  //   api_version: 'v1',
  //   data: { id: '86796015217' },
  //   date_created: '2024-09-05T23:50:41Z',
  //   id: 115683315636,
  //   live_mode: true,
  //   type: 'payment',
  //   user_id: '92583849'
  // }
  console.log('Webhook received:', req.body);



  res.status(200).json({ message: 'Webhook received' });
}
