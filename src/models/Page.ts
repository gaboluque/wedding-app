import { WithId, Document } from "mongodb";
import { dbName } from "@/config";
import mongoClient from "@/db/mongoClient";

export interface IPage {
  id: string;
  title: string;
  slug: string;
  content: any[]; // Consider using a more specific type if possible
  createdAt: Date;
  updatedAt: Date;
}

class Page implements IPage {
  id: string;
  title: string;
  slug: string;
  content: any[];
  createdAt: Date;
  updatedAt: Date;

  constructor(page: WithId<Document>) {
    this.id = page._id.toString();
    this.title = page.title;
    this.slug = page.slug;
    this.content = page.content;
    this.createdAt = page.createdAt;
    this.updatedAt = page.updatedAt;
  }

  static constructFromDoc(doc: WithId<Document>): Page {
    return new Page({
      _id: doc._id,
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt)
    });
  }

  static async fetchPages(query = {}): Promise<Page[]> {
    const db = mongoClient.db(dbName);
    const pages = await db.collection<IPage>("pages").find(query).toArray();
    return pages.map(Page.constructFromDoc);
  }

  static async fetchPage(slug: string): Promise<Page | null> {
    const db = mongoClient.db(dbName);
    const page = await db.collection<IPage>("pages").findOne({ slug });
    return page ? Page.constructFromDoc(page) : null;
  }
}

export default Page;
