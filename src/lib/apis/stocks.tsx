import { stockInstance } from "./api";


export async function getStockTransaction(page: number, size: number) {
  return await stockInstance.get("transactions?page=1&size=2", {
    params: {
      page,
      size,
    },
  });
}

export async function getAllStockNames(){
    return await stockInstance.get("/");
}
export async function getPrice(stocks : {"stockName" : string, "krxCode" : string}[]) : Promise<number[]> {
    const codes = stocks.map( (elem : {"stockName" : string, "krxCode" : string}) =>{ return elem.krxCode })

    const promises = codes.map(async (elem : string)=>{ 
        const result = await stockInstance.get("/"+elem+"/price")
        return result.data
    })

    const prices = await Promise.all(promises);

    return prices
}