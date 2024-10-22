import { ObjectId, WithId, Document } from "mongodb";
import mongoClient from "@/db/mongoClient";
import { dbName } from "@/config";


export interface IProduct {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  imageUrl: string;
  progress?: number;
  createdAt: Date;
  updatedAt: Date;
}

class Product implements IProduct {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  imageUrl: string;
  progress?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.totalAmount = product.totalAmount;
    this.imageUrl = product.imageUrl;
    this.progress = product.progress;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  static constructFromDoc(doc: WithId<Document>): Product {
    return new Product({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      totalAmount: doc.totalAmount,
      imageUrl: doc.imageUrl,
      progress: doc.progress,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  }

  static async fetchProducts(query = {}): Promise<Product[]> {
    const db = mongoClient.db(dbName);
    const products = await db.collection<IProduct>("products").find(query).sort({ createdAt: -1 }).toArray();
    return products.map(Product.constructFromDoc);
  }

  static async fetchProduct(id: string): Promise<Product | null> {
    const db = mongoClient.db(dbName);
    const product = await db.collection<IProduct>("products").findOne({ _id: new ObjectId(id) });
    return product ? Product.constructFromDoc(product) : null;
  }

  static async updateProgress(productId: string, newPayment: number): Promise<void> {
    const db = mongoClient.db(dbName);
    await db.collection<IProduct>("products").updateOne(
      { _id: new ObjectId(productId) },
      { $inc: { progress: newPayment } }
    );
  }

  static async setProgress(productId: string, newPayment: number): Promise<void> {
    const db = mongoClient.db(dbName);
    await db.collection<IProduct>("products").updateOne(
      { _id: new ObjectId(productId) },
      { $set: { progress: newPayment } }
    );
  }
}

export default Product;


// Count how many have createdAt null
// db.products.count({ createdAt: {

// Update all that don't have createdAt
// db.products.updateMany({ createdAt: null }, { $set: { createdAt: new Date(2024, 05, 01) } })
