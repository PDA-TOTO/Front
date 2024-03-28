import { Stack, Text } from "@mantine/core";
import {
  useStockDetailDispatch,
  useStockDetailSelector,
} from "../../lib/hooks/stockReduxHooks";
import { useEffect } from "react";

type StockTitleProps = {
  name: string;
  price: number;
  percent: number;
};

const StockTitle: React.FC<StockTitleProps> = ({
  name,
  price,
  percent,
}: StockTitleProps) => {
  const stockWebSocket = useStockDetailSelector(
    (state) => state.stockWebSocket
  );
  return (
    <Stack m={0} gap={0}>
      <Text size="lg">{name}</Text>
      <Text
        size="xxl"
        fw="bolder"
      >{`${stockWebSocket.bidp1.toLocaleString()} 원`}</Text>
      <Text c={percent < 0 ? "blue" : "red"}>{`${
        percent < 0 ? "-" : "+"
      }${percent} %`}</Text>
    </Stack>
  );
};

export default StockTitle;
