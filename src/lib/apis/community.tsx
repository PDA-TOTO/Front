import { communityInstance } from "./api";

export async function communityBykrxCode(stockId: string) {
  return await communityInstance.get("/" + stockId);
}
