import { communityInstance } from "./api";
import { AxiosRequestConfig } from "axios";

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

export async function getNaverStockInfo(stockId: string) {
  return await communityInstance.get("/naver/" + stockId);
}

export async function getNaverRisingStockInfo(stockList: string[]) {
  const data = {
    list: stockList,
  };

  const config: AxiosRequestConfig = {
    method: "post",
    url: "/naver/rising/list",
    data: data,
  };

  return await communityInstance(config);
}
