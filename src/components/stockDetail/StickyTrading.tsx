import { ActionIcon, Group, Paper, Stack, Text } from "@mantine/core";
import { ReactElement, useEffect, useState } from "react";
import MainStockTradingBody from "./MainStockTradingBody";
import StockTradingBody from "./StockTradingBody";
import { IconChevronLeft } from "@tabler/icons-react";
import { getMyStockInfo } from "../../lib/apis/stock";
type Info = { num: string; avg: number; trust: string };
type StickyTradingProps = {
  width: number;
};

enum TradingPageType {
  BASE,
  BUY,
  SELL,
}

const StickyTrading: React.FC<StickyTradingProps> = ({
  width,
}: StickyTradingProps) => {
  const stackGap = "xl";
  const [info, setInfo] = useState<Info>();
  const [tradingPage, setTradingPage] = useState<TradingPageType>(
    TradingPageType.BASE
  );

  const getBackTitle = (title: string): ReactElement => {
    return (
      <Group gap={0} style={{ transform: "translateX(-0.5rem)" }}>
        <ActionIcon
          variant="transparent"
          color="primary.5"
          onClick={() => setTradingPage(TradingPageType.BASE)}
        >
          <IconChevronLeft strokeWidth={1.5} />
        </ActionIcon>
        <Text size="lg">{title}</Text>
      </Group>
    );
  };

  const renderCurrentHeader = (pageType: TradingPageType) => {
    switch (pageType) {
      case TradingPageType.BUY:
        return getBackTitle("사기");
      case TradingPageType.SELL:
        return getBackTitle("팔기");
      default:
        return <Text size="lg">주식현황</Text>;
    }
  };

  const renderCurrentPage = (pageType: TradingPageType) => {
    console.log("RENDER:", info);
    switch (pageType) {
      case TradingPageType.BUY:
        return <StockTradingBody gap={stackGap} tradingType="BUY" />;
      case TradingPageType.SELL:
        return <StockTradingBody gap={stackGap} tradingType="CELL" />;
      default:
        return (
          info && (
            <MainStockTradingBody
              gap={stackGap}
              onBuyClick={() => setTradingPage(TradingPageType.BUY)}
              onSellClick={() => setTradingPage(TradingPageType.SELL)}
              num={info.num}
              avg={info.avg}
              trust={info.trust}
            />
          )
        );
    }
  };

  useEffect(() => {
    const stockCode = location.pathname.split("/").pop();
    console.log("[stockCode]:", stockCode);
    stockCode &&
      getMyStockInfo(stockCode)
        .then((response) => {
          console.log("INFO:", response.data.result);
          setInfo(response.data.result);
        })
        .catch((error) => {
          console.log("[Error]:", error);
        });
  }, []);
  return (
    <Paper
      shadow="xl"
      radius="lg"
      w={width}
      bg="block.5"
      style={{ position: "sticky", top: 20 }}
      p={20}
    >
      <Stack gap={stackGap}>
        {renderCurrentHeader(tradingPage)}
        {renderCurrentPage(tradingPage)}
      </Stack>
    </Paper>
  );
};

export default StickyTrading;
