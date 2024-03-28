import React, { useState, useEffect } from "react";
import { Flex, Grid, rem, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { risingStock } from "../../lib/apis/shinhan.stock";
import classes from "../../styles/stock/BottomStock.module.css";
import rightButton from "../../assets/img/stock/rightButton.svg";

type Props = {};

type risingData = {
  stbd_nm: string;
  stock_code: string;
};

export default function RisingStock({}: Props) {
  const [risingData, setRisingData] = useState<risingData[]>([]);
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
    });
  }, []);
  return (
    <Flex direction={"column"}>
      <Grid>
        {risingData?.map((value, idx) => {
          return (
            <Grid.Col
              span={6}
              key={idx}
              style={{ minHeight: rem(80), cursor: "pointer" }}
              onClick={() => navigate(`/stocks/${value.stock_code}`)}
            >
              <div className={classes.grid_card}>
                <Flex direction={"column"}>
                  <div className={classes.grid_card_nm}>{value.stbd_nm}</div>
                  <div className={classes.grid_card_price}>
                    {/* <div>{value.price}</div>
              <div className={classes.grid_card_percent}>
                {value.percent}
              </div> */}
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
