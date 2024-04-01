import { stockInstance } from "./api";

export type GlobalResponse<T> = {
  success: boolean;
  message: string;
  result?: T;
};

export type FinanceResponse = {
  code: string;
  yymm: string;
  rev: number;
  income: number;
  netincome: number;
  roeVal: number;
  eps: number;
  lbltRate: number;
  bps: number;
  incomeRate: number;
  incomeGrownthRate: number;
  netincomeGrownthRate: number;
  per: number;
  cap: number;
  pbr: number;
  dividend: number;
  dividendRate: number;
  quickRatio: number;
  consensus: number;
  beta: number;
  revGrownthRate: number;
  netincomeRate: number;
};

export const getFinance = async (
  id: string
): Promise<GlobalResponse<FinanceResponse>> => {
  const { data } = await stockInstance.get<GlobalResponse<FinanceResponse>>(
    `/${id}/finance`
  );

  return data;
};

export async function stockNews(stockId: string) {
  return await stockInstance.get("/" + stockId + "/news");
}

export async function stockMajors() {
  return await stockInstance.get("/index/majors");
}

export type StockInfoResponse = {
  chartLength: number;
  chart: any[];
  code: string;
  name: string;
  bundleUnit: string;
};

export const getStockInfo = async (
  id: string,
  prev: string,
  bundle: string
) => {
  const { data } = await stockInstance.get(`/${id}`, {
    params: {
      prev: prev,
      bundle: bundle,
    },
  });

  return data;
};

export async function stockNews2(stockId: string) {
  return await stockInstance.get("/" + stockId + "/news");
}

export async function stockMajors2() {
  return await stockInstance.get("/index/majors");
}

export async function stockInfo(stockId: string) {
  return await stockInstance.get("/" + stockId + "/info");
}

export async function stockMarketCap(page: number, size: number) {
  return await stockInstance.get(`/search/cap?page=${page}&size=${size}`);
}

export async function stockSearch(searchName: string) {
  return await stockInstance.get(`/search?name=${searchName}`);
}

export async function getRecentStock(krxCode: string) {
  return await stockInstance.get(`/stocks/${krxCode}/recent`);
}
