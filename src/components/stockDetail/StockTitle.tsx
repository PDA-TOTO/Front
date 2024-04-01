import { Stack, Text } from "@mantine/core";
import {
  useStockDetailDispatch,
  useStockDetailSelector,
} from "../../lib/hooks/stockReduxHooks";
import { getNaverStockInfo } from "../../lib/apis/community";
import { useState, useEffect } from "react";

type StockTitleProps = {
  name: string;
  price: number;
  percent: number;
  stockId: string;
};

type stockWebsocketType = {
  bidp1: string;
};
const StockTitle: React.FC<StockTitleProps> = ({
  name,
  price,
  percent,
  stockId,
}: StockTitleProps) => {
  const [closePrice, setClosePrice] = useState<string>("");
  const [currentPercent, setCurrentPercent] = useState<number>(0);
  const stockWebSocket: stockWebsocketType = useStockDetailSelector(
    (state) => state.stockWebSocket
  );
  const calculatePercentageChange = (
    firstNumber: number,
    secondNumber: number
  ) => {
    console.log("stock bidpq:", firstNumber, "naver close:", secondNumber);
    if (secondNumber === 0) {
      return 0;
    }

    const change = ((secondNumber - firstNumber) / secondNumber) * 100;
    return change > 0
      ? Number((1 + change).toFixed(2))
      : Number(change.toFixed(2));
  };
  useEffect(() => {
    stockId &&
      getNaverStockInfo(stockId).then((response) => {
        setClosePrice(response.data.closePrice);
        const NumberBidp1 = Number(stockWebSocket.bidp1);
        const NumberClosePrice = Number(
          response.data.closePrice.replace(/,/g, "")
        );
        const calP: number = calculatePercentageChange(
          NumberBidp1,
          NumberClosePrice
        );
        setCurrentPercent(calP);
        console.log("stockWebSocket.bidp1", stockWebSocket.bidp1);
      });
  }, [stockWebSocket.bidp1]);

  return (
    <Stack m={0} gap={0}>
      <Text size="lg">{name}</Text>
      <Text size="xxl" fw="bolder">{`${
        stockWebSocket.bidp1.toLocaleString() === ""
          ? "-"
          : `${Number(stockWebSocket.bidp1).toLocaleString()}`
      } 원`}</Text>
      <Text c={currentPercent < 0 ? "blue" : "red"}>{`${
        currentPercent < 0 ? "" : "+"
      }${currentPercent} %`}</Text>
    </Stack>
  );
};

export default StockTitle;
