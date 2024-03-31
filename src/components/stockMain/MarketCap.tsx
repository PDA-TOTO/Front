import React, { useEffect, useState } from "react";
import { stockMarketCap } from "../../lib/apis/stock";
import { Grid, rem, Image, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "../../styles/stock/MarketCap.module.css";
import rightButton from "../../assets/img/stock/rightButton.svg";
type Props = {};

type StockInfo = {
  code: string;
  name: string;
  cap: string;
  yymm: string;
};

const mockData = [
  { code: "001040", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001041", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001042", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001043", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001044", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001045", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001046", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001047", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
  { code: "001048", name: "CJ", cap: "2348748339000", yymm: "2023.09" },
];

export default function MarketCap({}: Props) {
  const [pageNum, setPageNum] = useState<number>(1);
  const [marketCap, setMarketCap] = useState<StockInfo[]>([]);
  const navigate = useNavigate();

  const handlePageNum = (type: string) => {
    if (pageNum > 1 && type === "minus") {
      setPageNum((prev) => prev - 1);
    } else if (type === "plus") {
      setPageNum((prev) => prev + 1);
    }
  };

  function formatNumberToBillionWithComma(number: number | string): string {
    const num = Number(number);
    const billion = 10 ** 8;
    const result = num / billion;

    return result.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  useEffect(() => {
    stockMarketCap(pageNum, 20).then((response) => {
      console.log(response.data.result);
      console.log(response.data.result.data);
      setMarketCap(response.data.result.data);
    });
  }, [pageNum]);
  return (
    <Flex direction={"column"}>
      <Grid>
        {marketCap.length > 0 &&
          marketCap.map((value: StockInfo) => {
            return (
              <Grid.Col
                span={6}
                key={value.code}
                style={{ minHeight: rem(80), cursor: "pointer" }}
                onClick={() => navigate(`/stocks/${value.code}`)}
                className={classes.box}
              >
                <div className={classes.grid_card}>
                  <Flex direction={"column"}>
                    <div className={classes.grid_card_nm}>{value.name}</div>
                    <div className={classes.grid_card_price}>
                      <Flex
                        direction={"row"}
                        justify="flex-end"
                        align="flex-end"
                      >
                        {formatNumberToBillionWithComma(value.cap)}
                        <Flex
                          justify="flex-end"
                          align="flex-end"
                          className={classes.billion}
                        >
                          (억)
                        </Flex>
                      </Flex>
                      <div className={classes.grid_card_percent}>
                        {value.yymm}
                      </div>
                    </div>
                  </Flex>
                  <Image h={30} src={rightButton} />
                </div>
              </Grid.Col>
            );
          })}
      </Grid>
      <Flex
        gap="md"
        justify={{ md: "center" }}
        style={{ paddingTop: "40px", cursor: "pointer" }}
      >
        <div onClick={() => handlePageNum("minus")}>{"<"}</div>
        {pageNum}
        <div onClick={() => handlePageNum("plus")}>{">"}</div>
      </Flex>
    </Flex>
  );
}
