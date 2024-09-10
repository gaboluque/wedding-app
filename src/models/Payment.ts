import { WithId, Document } from "mongodb";


export interface IPayment {
  id: string;
  product: string;
  amount: number;
  name?: string;
  comment?: string;
  paidAt: Date;
  paymentPayload?: any;
}

class Payment implements IPayment {
  id: string;
  product: string;
  amount: number;
  name?: string;
  comment?: string;
  paidAt: Date;
  paymentPayload?: any;

  constructor(payment: WithId<Document>) {
    this.id = payment._id.toString();
    this.product = payment.product;
    this.amount = payment.amount;
    this.name = payment.name;
    this.comment = payment.comment;
    this.paidAt = payment.paidAt;
    this.paymentPayload = payment.paymentPayload;
  }

  static constructFromDoc(doc: any): Payment {
    return new Payment({
      _id: doc._id,
      product: doc.product,
      amount: doc.amount,
      name: doc.name,
      comment: doc.comment,
      paidAt: new Date(doc.paidAt),
      paymentPayload: doc.paymentPayload,
    });
  }
}
