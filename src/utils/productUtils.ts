import { IProduct } from "@/models/Product";


export const productProgress = (product: IProduct): string => {
  // Product amount vs product progress in percentage, truncate to 100%
  const percentage =  Number(((product.progress || 0) / product.totalAmount) * 100)
  return percentage > 100 ? "100" : percentage.toFixed(0);
}
