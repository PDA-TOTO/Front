import { stockInstance } from "./api";

export async function getAllStockNames(){
    // const stocks = stockInstance.get("/");
    // console.log(stocks)
    // stocks.map((elem)=>{

    // })
    return await stockInstance.get("/");

}