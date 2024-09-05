import { dbClient } from "@/db/client";

export const fetchProducts = async (query = {}) => {
  return await dbClient.getMany('products', query);
}

export const fetchProduct = async (_id: string) => {
  return await dbClient.getOne('products', {
    filter: {
      _id: {"$oid": _id}
    },
    projection: {
      _id: 0,
      id: "$_id",
      name: 1,
      description: 1,
      totalAmount: 1,
      imageUrl: 1,
      progress: 1,
    }
  });
}
