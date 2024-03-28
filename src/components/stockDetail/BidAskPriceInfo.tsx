import { ScrollArea, Table } from "@mantine/core";
import {
  useStockDetailDispatch,
  useStockDetailSelector,
} from "../../lib/hooks/stockReduxHooks";

type BidAskPrice = {
  buy?: number;
  price: number;
  cell?: number;
};

const mockData: BidAskPrice[] = [
  { buy: 2399, price: 13999 },
  { buy: 2399, price: 13999 },
  { buy: 2399, price: 13999 },
  { buy: 2399, price: 133000 },
  { buy: 2399, price: 133500 },
  { buy: 2399, price: 134000 },
  { buy: 2399, price: 134500 },
  { buy: 2399, price: 134900 },
  { buy: 2399, price: 134500 },
  { buy: 2399, price: 134900 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
  { cell: 2399, price: 135000 },
];

type BidAskPriceInfoProps = {
  onPriceClick: (price: number) => void;
};

const BidAskPriceInfo: React.FC<BidAskPriceInfoProps> = ({
  onPriceClick,
}: BidAskPriceInfoProps) => {
  const stockWebSocket = useStockDetailSelector(
    (state) => state.stockWebSocket
  );

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
          {mockData.map((data, index) => (
            <Table.Tr key={index} onClick={() => onPriceClick(data.price)}>
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
