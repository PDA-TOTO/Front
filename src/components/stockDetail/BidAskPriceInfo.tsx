import { ScrollArea, Table } from "@mantine/core";
import {
  useStockDetailDispatch,
  useStockDetailSelector,
} from "../../lib/hooks/stockReduxHooks";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

type BidAskPrice = {
  buy?: number;
  price: number;
  cell?: number;
};

type BidAskPriceInfoProps = {
  onPriceClick: (price: number) => void;
  tradingType: string;
};

const BidAskPriceInfo: React.FC<BidAskPriceInfoProps> = ({
  onPriceClick,
  tradingType,
}: BidAskPriceInfoProps) => {
  const stockWebSocket = useStockDetailSelector(
    (state) => state.stockWebSocket
  );
  useEffect(() => {
    console.log("tradingType:", tradingType);
  }, []);

  const handleClick = () => {};

  return (
    <ScrollArea h={250}>
      <Table
        stickyHeader
        highlightOnHover
        withColumnBorders
        withRowBorders={false}
        style={{ textAlign: "center" }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center" }}>매도 수량</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>주가</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>매수 수량</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: 20 }, (_, index) => (
            <Table.Tr
              key={index}
              onClick={() => {
                if (tradingType === "팔기") {
                  if (index >= 10) {
                    notifications.show({
                      message: "팔 수 있는 금액대에서 선택해주세요!",
                      color: "primary.5",
                    });
                    return;
                  }
                } else if (tradingType === "사기") {
                  if (index < 10) {
                    notifications.show({
                      message: "살 수 있는 금액대에서 선택해주세요!",
                      color: "primary.5",
                    });
                    return;
                  }
                }
                onPriceClick(
                  index < 10
                    ? Number(stockWebSocket[`askp${10 - index}`])
                    : Number(stockWebSocket[`bidp${index - 9}`])
                );
              }}
            >
              <Table.Td c="blue.6">
                {index < 10 &&
                  stockWebSocket[`askp_rsqn${10 - index}`].toLocaleString()}
              </Table.Td>
              <Table.Td>
                {index < 10
                  ? stockWebSocket[`askp${10 - index}`].toLocaleString()
                  : stockWebSocket[`bidp${index - 9}`].toLocaleString()}
              </Table.Td>
              <Table.Td c="red.6">
                {index >= 10 &&
                  stockWebSocket[`bidp_rsqn${index - 9}`].toLocaleString()}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default BidAskPriceInfo;
