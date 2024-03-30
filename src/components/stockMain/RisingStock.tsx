import React, { useState, useEffect } from "react";
import { Flex, Grid, rem, Image, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { risingStock } from "../../lib/apis/shinhan.stock";
import classes from "../../styles/stock/BottomStock.module.css";
import rightButton from "../../assets/img/stock/rightButton.svg";
import { getNaverRisingStockInfo } from "../../lib/apis/community";

type Props = {};

type risingData = {
  stbd_nm: string;
  stock_code: string;
};

type StockInfo = {
  dd_cmpr_rank: number;
  now_rank: number;
  qry_numt: number;
  stbd_nm: string;
  stk_indc_code: string;
  stock_code: string;
};

type StockRisingInfo = {
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  itemCode: string;
  stockName: string;
};

export default function RisingStock({}: Props) {
  const [risingData, setRisingData] = useState<risingData[]>([]);
  const [risingInfoList, setRisingInfoList] = useState<StockRisingInfo[]>([]);
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState<number>(1);

  const handlePageNum = (type: string) => {
    if (pageNum > 1 && type === "minus") {
      setPageNum((prev) => prev - 1);
    } else if (type === "plus") {
      setPageNum((prev) => prev + 1);
    }
  };

  useEffect(() => {
    risingStock().then((response) => {
      const dataHeader = response.data.dataHeader;
      const dataBody = response.data.dataBody;
      if (dataHeader.successCode === "0") {
        setRisingData(dataBody.list);
        console.log(dataBody.list);
      }
      let newStockList: string[] = [];
      dataBody.list.map((value: StockInfo) => {
        newStockList.push(value.stock_code);
      });
      getNaverRisingStockInfo(newStockList)
        .then((response) => {
          console.log(response.data);
          setRisingInfoList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  return (
    <Flex direction={"column"}>
      <Badge
        size="xl"
        variant="gradient"
        gradient={{ from: "#e28c8c", to: "#8bc3e5", deg: 90 }}
        className={classes.top}
      >
        TOP 5
      </Badge>
      <Grid>
        {risingInfoList.length > 0 &&
          risingInfoList?.map((value, idx) => {
            return (
              <Grid.Col
                span={6}
                key={idx}
                style={{ minHeight: rem(80), cursor: "pointer" }}
                onClick={() => navigate(`/stocks/${value.itemCode}`)}
              >
                <div className={classes.grid_card}>
                  <Flex direction={"column"}>
                    <div className={classes.grid_card_nm}>
                      {value.stockName}
                    </div>
                    <div className={classes.grid_card_price}>
                      <div>{value.closePrice}</div>
                      <div
                        className={
                          Number(value.fluctuationsRatio) > 0
                            ? classes.grid_card_percent_plus
                            : classes.grid_card_percent_minus
                        }
                      >
                        {Number(value.fluctuationsRatio) > 0 && "+"}
                        {value.fluctuationsRatio}%
                      </div>
                    </div>
                  </Flex>
                  <Image h={30} src={rightButton} />
                </div>
              </Grid.Col>
            );
          })}
      </Grid>
      {/* <Flex
        gap="md"
        justify={{ md: "center" }}
        style={{ paddingTop: "40px", cursor: "pointer" }}
      >
        <div onClick={() => handlePageNum("minus")}>{"<"}</div>
        {pageNum}
        <div onClick={() => handlePageNum("plus")}>{">"}</div>
      </Flex> */}
    </Flex>
  );
}
