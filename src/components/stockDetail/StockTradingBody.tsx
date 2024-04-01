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
import { useLocation } from "react-router-dom";
import {
  getAllPortfolio,
  buyStock,
  sellStock,
} from "../../lib/apis/portfolios";
import { notifications } from "@mantine/notifications";

type StockTradingBodyProps = {
  gap: "xs" | "sm" | "md" | "lg" | "xl";
  tradingType: "BUY" | "CELL";
};
type KrxCode = {
  krxCode: string;
  name: string;
  type: string;
};

type PortfolioItem = {
  id: number;
  amount: string;
  avg: number;
  deletedAt: string | null;
  krxCode: KrxCode;
};

type Portfolio = {
  id: number;
  portName: string;
  isMain: boolean;
  deletedAt: string | null;
  portfolioItems: PortfolioItem[];
};
// test data
const portfolios = [
  "포트폴리오를 선택해주세요.",
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
  const location = useLocation();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [targetPortfolio, setTargetPortfolio] = useState(portfolios[0]);
  const [portList, setPortList] = useState<Portfolio[]>([]);
  const stockDetailDispatch = useStockDetailDispatch();
  const stockControl = useStockDetailSelector((state) => state.stockControl);
  const stockWebSocket = useStockDetailSelector(
    (state) => state.stockWebSocket
  );

  useEffect(() => {
    getAllPortfolio().then((response) => {
      console.log("response:", response.data.result);
      setPortList(response.data.result);
    });
  }, []);

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

  const handleBuySell = (value: string) => {
    const stockCode = location.pathname.split("/").pop();
    console.log(
      value,
      "price:",
      stockControl.price,
      "quantity:",
      stockControl.quantity,
      "stockCode:",
      stockCode,
      "targetPortfolio:",
      targetPortfolio
    );
    const selectedPortfolio = portList.find(
      (portfolio) => portfolio.portName === targetPortfolio
    );

    if (!selectedPortfolio) {
      console.error("Selected portfolio not found");
      return;
    }
    console.log("selectedPortfolio:", selectedPortfolio);
    if (value === "사기") {
      stockCode &&
        buyStock(
          Number(selectedPortfolio.id),
          Number(stockControl.quantity),
          String(stockControl.price),
          stockCode
        ).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            notifications.show({
              message: "주식 사기 성공!",
              autoClose: 3000,
              radius: "md",
              color: "red.5",
            });
          }
        });
    } else if (value === "팔기") {
      stockCode &&
        sellStock(
          Number(selectedPortfolio.id),
          Number(stockControl.quantity),
          String(stockControl.price),
          stockCode
        )
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              notifications.show({
                message: "주식 팔기 성공!",
                autoClose: 3000,
                radius: "md",
                color: "blue.5",
              });
            }
          })
          .catch((error) => {
            console.log("error:", error.response.status);
            if (error.response.status === 400) {
              notifications.show({
                message: "팔 수 있는 주식이 없습니다!",
                autoClose: 3000,
                radius: "md",
                color: "primary.5",
              });
            }
          });
    }
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
      {portList.length > 0 && (
        <PortfolioComobobox
          portfolios={portList}
          targetPortfolio={targetPortfolio}
          setTargetPortfolio={setTargetPortfolio}
        />
      )}
      <StockPriceInfobox />
      <Button
        color={tradingType === "BUY" ? "pink.5" : "secondary.5"}
        fullWidth
        autoContrast
        onClick={() => handleBuySell(tradingType === "BUY" ? "사기" : "팔기")}
      >
        {tradingType === "BUY" ? "사기" : "팔기"}
      </Button>
    </Stack>
  );
};

export default StockTradingBody;
