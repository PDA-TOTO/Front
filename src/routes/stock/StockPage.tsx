import React, { useState } from "react";
import { Flex } from "@mantine/core";
import classes from "../../styles/stock/StockMain.module.css";
import BottomStock from "../../components/stockMain/BottomStock";

type Props = {};

export default function StockPage({}: Props) {
  const [activateId, setActivateId] = useState(0);
  const data = [
    {
      title: "코스피",
      text: "2,668.59",
    },
    {
      title: "코스닥",
      text: "884.92",
    },
    {
      title: "금리",
      text: "3.2%",
    },
    {
      title: "환율",
      text: "1284 원",
    },
  ];

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
        {data.map((item, idx: number) => {
          return (
            <div
              key={idx}
              className={idx % 2 === 0 ? classes.card_v1 : classes.card_v2}
            >
              <div className={classes.card_title}>{item.title}</div>
              <div className={classes.card_text}>{item.text}</div>
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
