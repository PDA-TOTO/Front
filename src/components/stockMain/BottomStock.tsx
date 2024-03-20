import React, { useState } from "react";
import { Flex, Grid, rem, Image } from "@mantine/core";
import classes from "../../styles/stock/BottomStock.module.css";
import rightButton from "../../assets/img/stock/rightButton.svg";
import rightPageButton from "../../assets/img/stock/rightPageButton.svg";
import leftPageButton from "../../assets/img/stock/leftPageButton.svg";
import { useNavigate } from "react-router-dom";
type Props = {
  id: number;
};

export default function BottomStock({ id }: Props) {
  const data = [
    {
      stbd_nm: "농심",
      stock_code: "006670",
      price: "72,000원",
      percent: "+14.9%",
    },
    {
      stbd_nm: "영풍제지",
      stock_code: "006760",
      price: "72,000원",
      percent: "+14.9%",
    },
    {
      stbd_nm: "금양",
      stock_code: "001570",
      price: "72,000원",
      percent: "+14.9%",
    },
    {
      stbd_nm: "한올바이오파마",
      stock_code: "009620",
      price: "72,000원",
      percent: "+14.9%",
    },
    {
      stbd_nm: "삼성전자",
      stock_code: "005960",
      price: "72,000원",
      percent: "+14.9%",
    },
  ];
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState<number>(1);
  const handlePageNum = (type: string) => {
    if (pageNum > 1 && type === "minus") {
      setPageNum((prev) => prev - 1);
    } else if (type === "plus") {
      setPageNum((prev) => prev + 1);
    }
  };
  return (
    <div>
      {id === 0 && (
        <Grid>
          {data.map((value, idx) => {
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
                      <div>{value.price}</div>
                      <div className={classes.grid_card_percent}>
                        {value.percent}
                      </div>
                    </div>
                  </Flex>
                  <Image h={30} src={rightButton} />
                </div>
              </Grid.Col>
            );
          })}
        </Grid>
      )}
      {id === 1 && <div>시가 총액 순</div>}
      {id === 2 && <div>관심 종목</div>}
      <Flex
        gap="md"
        justify={{ md: "center" }}
        style={{ paddingTop: "40px", cursor: "pointer" }}
      >
        <div onClick={() => handlePageNum("minus")}>{"<"}</div>
        {pageNum}
        <div onClick={() => handlePageNum("plus")}>{">"}</div>
      </Flex>
    </div>
  );
}
