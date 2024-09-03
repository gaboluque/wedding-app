
const DB_NAME = process.env.DB_NAME || 'default_db';
const API_KEY = process.env.DB_API_KEY || '';
const BASE_URL = 'https://us-east-1.aws.data.mongodb-api.com/app/data-ysvfufk/endpoint/data/v1/action';

const baseRequest = async (url: string, method: string, collection: string, query = {}) => {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      collection,
      database: DB_NAME,
      dataSource: 'Cluster0',
      ...query,
    })
  });
  return res.json();
}

export const dbClient = {
  getMany: async (collection: string, query: any) => baseRequest(`${BASE_URL}/find`, 'POST', collection, query),
  getOne: async (collection: string, query: any) => baseRequest(`${BASE_URL}/findOne`, 'POST', collection, query),
}
