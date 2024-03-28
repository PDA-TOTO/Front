import { shinhanStockInstance } from "./api";

const SHINHAN_APP_KEY = process.env.SHINHAN_APP_KEY;

export async function risingStock() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "/v1.0/ranking/rising",
    headers: {
      apiKey: SHINHAN_APP_KEY,
    },
  };
  try {
    const response = await shinhanStockInstance(config);
    return response;
  } catch (error) {
    // 오류 처리
    console.error("Error fetching rising stocks:", error);
    throw error;
  }
}
