import { stockInstance } from "./api";

export async function getAllStockNames(){
    return await stockInstance.get("/");
}
export function getPrice(stocks : string[]) : number[] {
    // return await stockInstance.get("/",stocks);
    console.log(stocks)
    return [10000,20300, 4000];
}