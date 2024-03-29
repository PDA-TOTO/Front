import { Button, Stack, Text, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import PortfolioComobobox from "./PortfolioCombobox";
import StockPriceInfobox from "./StockPriceInfobox";
import {
  useStockDetailSelector,
  useStockDetailDispatch,
} from "../../lib/hooks/stockReduxHooks";
import AnimatedNumber from "../common/animate/AnimatedNumber";
import { setPrice } from "../../store/reducers/stockControlReducers";

type StockTradingBodyProps = {
  gap: "xs" | "sm" | "md" | "lg" | "xl";
  tradingType: "BUY" | "CELL";
};

// test data
const portfolios = [
  "내 기본 포트폴리오",
  "포폴 1",
  "포폴 2",
  "포폴 3",
  "이상하게 긴 포트폴리오 이름은 어떻게 될까요?????",
];
const balance = 2300000;

const StockTradingBody: React.FC<StockTradingBodyProps> = ({
  gap,
  tradingType,
}: StockTradingBodyProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [targetPortfolio, setTargetPortfolio] = useState(portfolios[0]);
  const stockDetailDispatch = useStockDetailDispatch();
  const stockControl = useStockDetailSelector((state) => state.stockControl);
  const stockWebSocket = useStockDetailSelector(
    (state) => state.stockWebSocket
  );

  useEffect(() => {
    stockDetailDispatch(setPrice(Number(stockWebSocket.bidp1)));
  }, [stockWebSocket.bidp1]);

  const getTotalPrice = (price?: number, quantity: number = 0) => {
    if (!price) {
      return 0;
    }

    if (quantity === 0) {
      return price;
    }

    return price * quantity;
  };

  return (
    <Stack gap={gap}>
      <Stack gap={0}>
        <Text>총금액</Text>
        <AnimatedNumber
          toNumber={getTotalPrice(stockControl.price, stockControl.quantity)}
          fw="bolder"
          size="xxl"
          suffix="원"
          includeComma
        />
        <Text
          size="xs"
          c="gray.5"
        >{`잔고: ${balance.toLocaleString()} 원`}</Text>
      </Stack>
      <PortfolioComobobox
        portfolios={portfolios}
        targetPortfolio={targetPortfolio}
        setTargetPortfolio={setTargetPortfolio}
      />
      <StockPriceInfobox />
      <Button
        color={tradingType === "BUY" ? "pink.5" : "secondary.5"}
        fullWidth
        autoContrast
      >
        {tradingType === "BUY" ? "사기" : "팔기"}
      </Button>
    </Stack>
  );
};

export default StockTradingBody;
