import { portfolioInstance } from "./api";

export async function createPortfolio(portId : Number, stocks : List, weights : Array){
    let req = {}
    req.portId = portId
    req.items = []
    for(let i = 0; i<stocks.length; i++){
        req.items.push({"stock" : stocks[i], "weight" : weights[i]})
    }
    console.log(req)
    return await portfolioInstance.post("/create",{body : req})
}