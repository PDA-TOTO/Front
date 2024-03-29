import { portfolioInstance } from "./api";

export type stockAmountAndPriceProps={
    user : string,
    newPortName : string,
    stockCode: Array<{name : string, krxCode : string}>,
    stockAmountAndPrice: Array<{amount : number, price : number}>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createPortfolio({user, newPortName ,stockCode , stockAmountAndPrice} : stockAmountAndPriceProps){
    console.log(stockCode)
    const req: { user : string, portName : string ,items: {"amount" : number , "price" : number, "krxCode":string}[] } = {
        user : user,
        items: [],
        portName : newPortName
      };
    for(let i = 0; i<stockCode.length; i++){
        console.log(stockCode[i],stockAmountAndPrice[i])
        req.items.push({"amount" : stockAmountAndPrice[i].amount, "price" : stockAmountAndPrice[i].price, "krxCode" : stockCode[i].krxCode})
    }
    return await portfolioInstance.post("/create",{data : req})
}

export async function getPortNames(){
    return await portfolioInstance.get("/getAllPorts")
}

export async function findStocksByPortId( portId : number){
    return await portfolioInstance.get("/getstocks",{ data : portId})
}