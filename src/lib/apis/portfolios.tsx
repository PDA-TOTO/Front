import { portfolioInstance, portfolioInstance2 } from "./api";

<<<<<<< HEAD
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deletePortfolio(portId : number){
    return await portfolioInstance.delete("/"+portId)
}
export async function getPortNames(){
    return await portfolioInstance.get("/getAllPorts")
}

export async function findStocksByPortId( portId : number){
    return await portfolioInstance.get("/getstocks",{ data : portId})
}

export async function getWeight(portId: number) {
    return await portfolioInstance.get("/" + portId);
}

export async function getBeta() {
    const result = await portfolioInstance.get("/1/beta");
    return result.data.betas
}
=======
type props = {
  user: string;
  portId: number;
  portName: string;
  stockCode: Array<{ name: string; krxCode: string }>;
  selectedStockWeight: Array<number>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createPortfolio({
  user,
  portId,
  portName,
  stockCode,
  selectedStockWeight,
}: props) {
  console.log(stockCode);
  const req: {
    user: string;
    portId: number;
    portName: string;
    items: { stock: string; weight: number; code: string }[];
  } = {
    user: user,
    portId: portId,
    items: [],
    portName: portName,
  };

  for (let i = 0; i < stockCode.length; i++) {
    console.log(stockCode[i], selectedStockWeight[i]);
    req.items.push({
      stock: stockCode[i].name,
      weight: selectedStockWeight[i],
      code: stockCode[i].krxCode,
    });
  }
  console.log(req);
  return await portfolioInstance.post("/create", { data: req });
}

export async function getPortNames(userId: number) {
  return await portfolioInstance.get("/portNames", { data: userId });
}

export async function buyStock(
  portfolioId: number,
  amount: number,
  price: string,
  krxCode: string
) {
  //   const data = { amount: 15, price: "40000", krxCode: "001040" };
  const data = { amount: amount, price: price, krxCode: krxCode };
  return await portfolioInstance2.post(`/${portfolioId}/buy`, data);
}

export async function sellStock(
  portfolioId: number,
  amount: number,
  price: string,
  krxCode: string
) {
  //   const data = { amount: 15, price: "40000", krxCode: "001040" };
  const data = { amount: amount, price: price, krxCode: krxCode };
  return await portfolioInstance2.put(`/${portfolioId}/sell`, data);
}

export async function getAllPortfolio() {
  return await portfolioInstance2.get("/getAllPorts");
}
>>>>>>> 2302ab355ef6a9f32d7fe3890b611fba30b6fb96
