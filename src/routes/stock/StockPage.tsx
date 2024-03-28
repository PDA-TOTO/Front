import React, { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import classes from "../../styles/stock/StockMain.module.css";
import BottomStock from "../../components/stockMain/BottomStock";
import { stockMajors } from "../../lib/apis/stock";

export interface stockMajor {
  itemCode: string;
  reutersCode: string;
  stockName: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  compareToPreviousPrice: {
    code: string;
    text: string;
    name: string;
  };
  fluctuationsRatio: string;
  localTradedAt: string;
  imageCharts: {
    mini: string;
  };
  marketStatus: string;
  delayTime: number;
  delayTimeName: string;
  stockExchangeType: {
    code: string;
    zoneId: string;
    nationType: string;
    delayTime: number;
    startTime: string;
    endTime: string;
    closePriceSendTime: string;
    nameKor: string;
    nameEng: string;
    nationCode: string;
    nationName: string;
    name: string;
  };
}

export default function StockPage() {
  const [activateId, setActivateId] = useState(0);
  const [stockMajorList, setStockMajorList] = useState<stockMajor[]>([]);
  useEffect(() => {
    stockMajors().then((response) => {
      setStockMajorList(response.data);
    });
  }, []);

  const buttonGroup = [
    {
      id: 0,
      label: "요즘 뜨는",
    },
    {
      id: 1,
      label: "시가총액순",
    },
    {
      id: 2,
      label: "관심종목",
    },
  ];

  return (
    <div className={classes.page}>
      <div className={classes.gap_top} />
      <Flex dir="row" justify="space-between" gap="sm">
        {stockMajorList?.map((item, idx: number) => {
          return (
            <div
              key={idx}
              className={idx % 2 === 0 ? classes.card_v1 : classes.card_v2}
            >
              <div className={classes.card_title}>{item.stockName}</div>
              <div className={classes.card_text}>
                {item.closePrice}
                {Number(item.fluctuationsRatio) > 0 ? (
                  <div className={classes.card_percent_plus}>
                    +{item.fluctuationsRatio}%
                  </div>
                ) : (
                  <div className={classes.card_percent_minus}>
                    {item.fluctuationsRatio}%
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Flex>
      <div className={classes.gap_mid} />
      <Flex dir="row" justify="space-between">
        <Flex dir="row" align="center">
          {buttonGroup.map((item, idx) => {
            return (
              <button
                className={
                  activateId === item.id
                    ? classes.btn_activate_mid
                    : classes.btn_mid
                }
                key={idx}
                onClick={() => setActivateId(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </Flex>
        <input className={classes.input_stock} placeholder="검색할 주식 입력" />
      </Flex>
      <div className={classes.bottom_stock_box}>
        <BottomStock id={activateId} />
      </div>
    </div>
  );
}
