import { stockInstance } from "./api";

export async function getAllStockNames() {
  const stocks = stockInstance.get("/");
  console.log(stocks);
  // stocks.map((elem)=>{

  // })
  return await stockInstance.get("/");
}

export async function getStockTransaction(page: number, size: number) {
  return await stockInstance.get("transactions?page=1&size=2", {
    params: {
      page,
      size,
    },
  });
}
