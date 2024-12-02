import { IPaymentWithProduct } from "@/models/Payment";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/currencyUtils";
import { Modal } from "@/components/Modal";


export default function Payments() {
  const [payments, setPayments] = useState<IPaymentWithProduct[]>([]);
  const [messageModalOpen, setMessageModal] = useState<IPaymentWithProduct | null>(null);

  useEffect(() => {
    fetch("/api/payments")
      .then(res => res.json())
      .then(data => setPayments(data));
  }, []);

  const setPaymentMessage = (payment: IPaymentWithProduct) => {
    setMessageModal(payment);
  }

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
          <th></th>
        </tr>
        </thead>
        <tbody>
        {payments.map(payment => (
          <tr key={payment.id} className="h-12">
            <td className="w-72">{payment.name || ""}</td>
            <td className="text-center w-44">{formatCurrency(payment.amount)}</td>
            <td className="text-center w-72">{payment.product?.name || "Producto eliminado"}</td>
            <td className="text-center">{!!payment.paidAt ? `✅` : `❌`}</td>
            <td className="text-center">
              <button className="btn text-xs" onClick={() => setPaymentMessage(payment)}>
                Mensaje
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {
        messageModalOpen && (
          <Modal open={!!messageModalOpen} onClose={() => setMessageModal(null)} title="Mensaje del pago">
            <p>{messageModalOpen.comment}</p>
          </Modal>
        )
      }
    </main>
  )
}
