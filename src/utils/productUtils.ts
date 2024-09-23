import { IProduct } from "@/models/Product";


export const productProgress = (product: IProduct): string => {
  // Product amount vs product progress in percentage
  return Number(((product.progress || 0) / product.totalAmount) * 100).toFixed(0);
}
