import { communityInstance } from "./api";

export enum VoteType {
  NONE = "NONE",
  LIKE = "LIKE",
  UNLINK = "UNLIKE",
}

export async function communityBykrxCode(stockId: string) {
  return await communityInstance.get("/" + stockId);
}

export async function voteChange(
  stockId: string,
  communityId: number,
  voteType: string
) {
  const data = {
    communityId: communityId,
    voteType: voteType,
  };
  return await communityInstance.post("/vote/" + stockId, data);
}
