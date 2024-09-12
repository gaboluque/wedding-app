import type { NextApiRequest, NextApiResponse } from 'next'
import { Error } from "@/pages/api/helpers";
import MercadoPagoClient from "@/models/MercadoPagoClient";
import Payment from "@/models/Payment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | Error>
) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { body } = req;
  // {
  //   "action": "payment.updated",
  //   "api_version": "v1",
  //   "data": { "id": "86797561197" },
  //   "date_created": "2021-11-01T02:02:02Z",
  //   "id": "123456",
  //   "live_mode": false,
  //   "type": "payment",
  //   "user_id": 92583849
  // }

  if (['payment.updated', 'payment.created'].includes(body)) res.status(200).json(invalidAction(body));

  // Process payment update
  const paymentId = body.data.id;
  const mercadoPagoPayment = await MercadoPagoClient.getPayment(paymentId);
  if (!mercadoPagoPayment) return res.status(404).json(mercadoPagoPaymentNotFound(body));

  const product = mercadoPagoPayment.additional_info.items[0].id;
  const payerEmail = mercadoPagoPayment.payer.email;

  const payment = await Payment.fetchPaymentByEmailAndProduct(payerEmail, product);
  if (!payment) return res.status(404).json(mercadoPagoPaymentNotFound(body));

  // Update payment status
  const update = await Payment.updatePayment(payment.id, {
    paidAt: new Date(mercadoPagoPayment.date_approved),
    paymentPayload: mercadoPagoPayment,
  });

  if (!update) return res.status(500).json({ message: 'Failed to update payment' });

  res.status(200).json({});
}

function mercadoPagoPaymentNotFound(body: any) {
  console.error(`Payment not found: ${body.data.id}`);
  return { message: `Payment not found: ${body.data.id}` };
}

function invalidAction(body: any) {
  console.error(`Invalid action: ${body.action}`);
  return { message: `Invalid action: ${body.action}` };
}
