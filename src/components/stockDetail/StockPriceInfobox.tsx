import { Container, Tabs } from "@mantine/core";
import StockCounter from "./StockCounter";
import BidAskPriceInfo from "./BidAskPriceInfo";
import { useState } from "react";
import { useStockDetailDispatch } from "../../lib/hooks/stockReduxHooks";
import { setPrice } from "../../store/reducers/stockControlReducers";

const StockPriceInfobox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>("counter");
  const stockDetailDispatch = useStockDetailDispatch();

  return (
    <Container
      w="100%"
      bg="white.5"
      style={{ borderRadius: 8, boxShadow: "var(--mantine-shadow-lg)" }}
      px={0}
    >
      <Tabs value={activeTab} onChange={setActiveTab} color="primary.5">
        <Tabs.List grow>
          <Tabs.Tab value="counter">주문</Tabs.Tab>
          <Tabs.Tab value="bidAskPrice">호가</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="counter">
          <StockCounter />
        </Tabs.Panel>
        <Tabs.Panel value="bidAskPrice">
          <BidAskPriceInfo
            onPriceClick={(price) => {
              setActiveTab("counter");
              console.log(price);
              stockDetailDispatch(setPrice(price));
            }}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default StockPriceInfobox;
