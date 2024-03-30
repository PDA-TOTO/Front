import { Grid, Group, Stack, Switch } from "@mantine/core";
import StickyTrading from "../../components/stockDetail/StickyTrading";
import { useNavigate, useParams } from "react-router-dom";
import StockTitle from "../../components/stockDetail/StockTitle";
import { useEffect, useState, useCallback } from "react";
import { useElementSize, useToggle } from "@mantine/hooks";
import StockNav from "../../components/stockDetail/StockNav";
import StockChart from "../../components/stockDetail/StockChart";
import {
  useStockDetailSelector,
  useStockDetailDispatch,
} from "../../lib/hooks/stockReduxHooks";
import { setPrice } from "../../store/reducers/stockControlReducers";
import useWebSocket from "react-use-websocket";
import { getStockInfo } from "../../lib/apis/stock";
import {
  pushWebsocketPrice,
  resetWebSocketState,
} from "../../store/reducers/stockWebSocketReducers";
import { useLocation } from "react-router-dom";

type StockInfo = {
  price: number;
  percent: number;
};

type chartData = {
  price_code: string;
  price_date: string;
  price_ePr: string;
  price_hPr: string;
  price_iPr: string;
  price_id: number;
  price_sPr: string;
};

const StockDetailPage: React.FC = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [isProMode, proModeToggle] = useToggle([false, true] as const);
  const [stockName, setStockName] = useState<string>("");
  const [chart, setChart] = useState<chartData[]>([]);
  const navigate = useNavigate();
  const stockDetailDispatch = useStockDetailDispatch();
  const WEBSOCKET_URL = process.env.WEBSOCKET_URL;
  const [stockInfo, setStockInfo] = useState<StockInfo>({
    price: 134900,
    percent: 12.9,
  });
  const getCurrentDateTimeString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  };

  const handleWebSocket = useCallback(() => {
    const url = window.location.href;
    if (/^[0-9]$/.test(url[url.length - 1]) && WEBSOCKET_URL) {
      const ws = new WebSocket(WEBSOCKET_URL);
      let intervalId: NodeJS.Timeout | null = null; // 타이머 ID 저장 변수

      ws.onopen = function () {
        console.log("readyState:", ws.readyState);

        if (ws.readyState > 0) {
          intervalId = setInterval(() => {
            id && ws.send(id);
          }, 2000);
        }
      };

      ws.onclose = function () {
        console.log("-CLOSE-");
        stockDetailDispatch(resetWebSocketState());
      };

      ws.onmessage = function (event) {
        const message = JSON.parse(JSON.parse(event.data));
        const url = window.location.href;

        console.log("message:", message);
        if (/^[0-9]$/.test(url[url.length - 1]) === false) {
          ws.close();
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
        const webSocketData = {
          krxCode: id || "",
          aspr_acpt_hour: message.output1.aspr_acpt_hour,
          askp1: message.output1.askp1,
          askp2: message.output1.askp2,
          askp3: message.output1.askp3,
          askp4: message.output1.askp4,
          askp5: message.output1.askp5,
          askp6: message.output1.askp6,
          askp7: message.output1.askp7,
          askp8: message.output1.askp8,
          askp9: message.output1.askp9,
          askp10: message.output1.askp10,
          bidp1: message.output1.bidp1,
          bidp2: message.output1.bidp2,
          bidp3: message.output1.bidp3,
          bidp4: message.output1.bidp4,
          bidp5: message.output1.bidp5,
          bidp6: message.output1.bidp6,
          bidp7: message.output1.bidp7,
          bidp8: message.output1.bidp8,
          bidp9: message.output1.bidp9,
          bidp10: message.output1.bidp10,
          askp_rsqn1: message.output1.askp_rsqn1,
          askp_rsqn2: message.output1.askp_rsqn2,
          askp_rsqn3: message.output1.askp_rsqn3,
          askp_rsqn4: message.output1.askp_rsqn4,
          askp_rsqn5: message.output1.askp_rsqn5,
          askp_rsqn6: message.output1.askp_rsqn6,
          askp_rsqn7: message.output1.askp_rsqn7,
          askp_rsqn8: message.output1.askp_rsqn8,
          askp_rsqn9: message.output1.askp_rsqn9,
          askp_rsqn10: message.output1.askp_rsqn10,
          bidp_rsqn1: message.output1.bidp_rsqn1,
          bidp_rsqn2: message.output1.bidp_rsqn2,
          bidp_rsqn3: message.output1.bidp_rsqn3,
          bidp_rsqn4: message.output1.bidp_rsqn4,
          bidp_rsqn5: message.output1.bidp_rsqn5,
          bidp_rsqn6: message.output1.bidp_rsqn6,
          bidp_rsqn7: message.output1.bidp_rsqn7,
          bidp_rsqn8: message.output1.bidp_rsqn8,
          bidp_rsqn9: message.output1.bidp_rsqn9,
          bidp_rsqn10: message.output1.bidp_rsqn10,
        };
        stockDetailDispatch(pushWebsocketPrice(webSocketData));
        const newData = {
          price_code: id || "",
          price_date: getCurrentDateTimeString(),
          price_ePr: message.output1.bidp1,
          price_hPr: "",
          price_iPr: "",
          price_id: 1232424,
          price_sPr: "",
        };
        setChart((prevChart) => [newData, ...prevChart]);
      };

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, []);

  useEffect(() => {
    handleWebSocket();
  }, [handleWebSocket]);

  const { ref, width } = useElementSize();

  const fetchStockBasicInfo = async () => {
    try {
      const data = await getStockInfo(id!, "3m", "DAY");
      console.log("chart:", data.result.chart);
      setStockName(data.result.name);
      setChart(data.result.chart);
    } catch (_) {
      navigate("/not-found");
    }
  };

  useEffect(() => {
    fetchStockBasicInfo();
  }, []);

  return (
    <Stack px={72} pt={34}>
      <Group align="start" justify="space-between">
        <StockTitle
          name={stockName}
          price={stockInfo.price}
          percent={stockInfo.percent}
        />
        <Switch
          color="primary.5"
          labelPosition="left"
          label="Pro Mode"
          checked={isProMode}
          onChange={() => proModeToggle()}
        />
      </Group>
      <Grid justify="space-between" px={0} columns={32}>
        <Grid.Col span={22}>
          <Stack>
            <StockChart stockData={chart} />
            <StockNav />
          </Stack>
        </Grid.Col>
        <Grid.Col span={10} ref={ref}>
          <StickyTrading width={width} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default StockDetailPage;
