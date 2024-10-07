import { IPaymentWithProduct } from "@/models/Payment";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/currencyUtils";


export default function Payments() {
  const [payments, setPayments] = useState<IPaymentWithProduct[]>([]);

  useEffect(() => {
    fetch("/api/payments")
      .then(res => res.json())
      .then(data => setPayments(data));
  }, []);

  return (
    <main className="payments">
      <h3 className="text-center mb-5">Pagos</h3>
      <table className="table-auto w-full">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Valor</th>
          <th>Producto</th>
          <th>Pago recibido</th>
        </tr>
        </thead>
        <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td className="w-72">{payment.name || ""}</td>
            <td className="text-center w-44">{formatCurrency(payment.amount)}</td>
            <td className="text-center w-72">{payment.product.name}</td>
            <td className="text-center">{!!payment.paidAt ? `✅` : `❌`}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </main>
  )
}
