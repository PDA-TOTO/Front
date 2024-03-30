import { portfolioInstance } from "./api";

export type stockAmountAndPriceProps={
    newPortName : string,
    selectedStock : Array<{stockName: string, krxCode: string}>,
    selectedStockAmount: Array<number>,
    prices : Array<number>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createPortfolio({newPortName ,selectedStock , selectedStockAmount, prices } : stockAmountAndPriceProps){
    const data: { portName : string , items: {"amount" : number , "price" : number, "krxCode":string}[] } = {
        items: [],
        portName : newPortName
      };
    for(let i = 0; i<selectedStock.length; i++){
        data.items.push({"amount" : selectedStockAmount[i], "price" : prices[i], "krxCode" : selectedStock[i].krxCode})
    }
    console.log(data)
    return await portfolioInstance.post("/",data)
}

export async function getPortNames(){
    return await portfolioInstance.get("/getAllPorts")
}

export async function findStocksByPortId( portId : number){
    return await portfolioInstance.get("/getstocks",{ data : portId})
}