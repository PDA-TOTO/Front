import { portfolioInstance } from "./api";

type props={
    portId: number,
    stocks: Array<string>,
    weights: Array<number>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createPortfolio({portId, stocks , weights} : props){
    const req: { portId: number, items: {"stock" : string , "weight" : number}[] } = {
        portId: portId,
        items: []
      };

    for(let i = 0; i<stocks.length; i++){
        req.items.push({"stock" : stocks[i], "weight" : weights[i]})
    }
    console.log(req)
    return await portfolioInstance.post("/create",{body : req})
}