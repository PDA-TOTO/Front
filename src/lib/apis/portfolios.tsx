import { portfolioInstance, portfolioInstance2 } from "./api";

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
  return await portfolioInstance2.post(`/:${portfolioId}/buy`, data);
}

export async function getAllPortfolio() {
  return await portfolioInstance2.get("/getAllPorts");
}
