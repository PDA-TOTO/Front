import { stockInstance } from "./api";

export async function stockNews(stockId: string) {
  return await stockInstance.get("/" + stockId + "/news");
}
