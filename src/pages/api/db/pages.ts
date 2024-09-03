import { dbClient } from "@/pages/api/db/client";

export const fetchPages = async (query = {}) => {
  return await dbClient.getMany('pages', query);
}

export const fetchPage = async (slug: string) => {
  return await dbClient.getOne('pages', { filter: {slug} });
}
