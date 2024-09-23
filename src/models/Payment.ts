import { WithId, Document, OptionalId, ObjectId } from "mongodb";
import mongoClient from "@/db/mongoClient";
import { dbName } from "@/config";
import Product from "@/models/Product";


export interface IPayment {
  id: string;
  product: string;
  amount: number;
  name?: string;
  comment?: string;
  paidAt?: Date;
  email?: string;
  paymentPayload?: any;
  preferenceId: string;
}

class Payment implements IPayment {
  id: string;
  product: string;
  amount: number;
  name?: string;
  comment?: string;
  paidAt?: Date;
  email?: string;
  paymentPayload?: any;
  preferenceId: string;

  constructor(payment: WithId<Document>) {
    this.id = payment._id.toString();
    this.product = payment.product;
    this.amount = payment.amount;
    this.name = payment.name;
    this.comment = payment.comment;
    this.paidAt = payment.paidAt;
    this.email = payment.email;
    this.paymentPayload = payment.paymentPayload;
    this.preferenceId = payment.preferenceId;
  }

  static constructFromDoc(doc: any): Payment {
    return new Payment({
      _id: doc._id,
      product: doc.product,
      amount: doc.amount,
      name: doc.name,
      comment: doc.comment,
      paidAt: new Date(doc.paidAt),
      email: doc.email,
      paymentPayload: doc.paymentPayload,
      preferenceId: doc.preferenceId,
    });
  }

  static async createPayment(payment: OptionalId<IPayment>): Promise<Payment | null> {
    const db = mongoClient.db(dbName);

    const res = await db.collection<IPayment>("payments").insertOne(payment);
    if (!res.acknowledged) return null;

    const createdPayment = await db.collection<IPayment>("payments").findOne({ _id: res.insertedId });

    await Product.updateProgress(payment.product, payment.amount);

    return Payment.constructFromDoc(createdPayment);
  }

  static async fetchPaymentByEmailAndProduct(email: string, product: string): Promise<Payment | null> {
    const db = mongoClient.db(dbName);

    const payment = await db.collection<IPayment>("payments").findOne({ email, product });
    return payment ? Payment.constructFromDoc(payment) : null;
  }

  static async updatePayment(id: string, payment: Partial<IPayment>): Promise<Payment | null> {
    const db = mongoClient.db(dbName);

    try {
      const res = await db.collection<IPayment>("payments").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: payment },
        { returnDocument: "after" }
      );

      if (res) return Payment.constructFromDoc(res);
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default Payment;
