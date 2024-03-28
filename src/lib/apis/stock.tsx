import { stockInstance } from "./api";

export async function stockNews(stockId: string) {
  return await stockInstance.get("/" + stockId + "/news");
}

export async function stockMajors() {
  return await stockInstance.get("/majors");
}
