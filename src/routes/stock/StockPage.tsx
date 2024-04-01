import React, { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import classes from "../../styles/stock/StockMain.module.css";
import BottomStock from "../../components/stockMain/BottomStock";
import { stockMajors2, stockSearch } from "../../lib/apis/stock";
import { useNavigate } from "react-router-dom";

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

type StockInfo = {
  krxCode: string;
  name: string;
  type: string;
};

const mockSearchList = [
  { krxCode: "005930", name: "삼성전자", type: "STOCK" },
  { krxCode: "005931", name: "삼성전자", type: "STOCK" },
  { krxCode: "005932", name: "삼성전자", type: "STOCK" },
  { krxCode: "005933", name: "삼성전자", type: "STOCK" },
  { krxCode: "005934", name: "삼성전자", type: "STOCK" },
  { krxCode: "005935", name: "삼성전자", type: "STOCK" },
  { krxCode: "005936", name: "삼성전자", type: "STOCK" },
  { krxCode: "005937", name: "삼성전자", type: "STOCK" },
  { krxCode: "005938", name: "삼성전자", type: "STOCK" },
  { krxCode: "005939", name: "삼성전자", type: "STOCK" },
  { krxCode: "0059310", name: "삼성전자", type: "STOCK" },
  { krxCode: "0059311", name: "삼성전자", type: "STOCK" },
  { krxCode: "0059312", name: "삼성전자", type: "STOCK" },
  { krxCode: "0059313", name: "삼성전자", type: "STOCK" },
];

export default function StockPage() {
  const [activateId, setActivateId] = useState(0);
  const [stockMajorList, setStockMajorList] = useState<stockMajor[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchList, setSearchList] = useState<StockInfo[]>();
  const navigate = useNavigate();
  useEffect(() => {
    stockMajors2().then((response) => {
      setStockMajorList(response.data);
    });
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    try {
      const value = e.target.value;
      const response = value !== "" && (await stockSearch(e.target.value));
      response && console.log("search:", response.data.result);
      response && setSearchList(response.data.result);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const buttonGroup = [
    {
      id: 0,
      label: "요즘 뜨는",
    },
    {
      id: 1,
      label: "시가총액순",
    },
    // {
    //   id: 2,
    //   label: "관심종목",
    // },
  ];

  return (
    <div className={classes.page}>
      <div className={classes.gap_top} />
      <Flex dir="row" justify="space-between" gap="sm">
        {stockMajorList.length > 0 ? (
          stockMajorList?.map((item, idx: number) => {
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
          })
        ) : (
          <div className={classes.skeleton}></div>
        )}
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
        <Flex direction={"column"}>
          <input
            className={classes.input_stock}
            placeholder="검색할 주식 입력"
            onChange={(e) => handleInputChange(e)}
            value={searchValue}
          />
          {searchValue !== "" && (
            <Flex
              className={`${classes.input_result} ${
                searchValue !== "" ? classes.show : ""
              }`}
              direction={"column"}
            >
              {searchList?.map((value) => {
                return (
                  <Flex
                    direction={"row"}
                    onClick={() => navigate(`/stocks/${value.krxCode}`)}
                    key={value.krxCode}
                    className={classes.stock_search}
                  >
                    {value.name}
                    <div className={classes.search_krxCode}>
                      {value.krxCode}
                    </div>
                  </Flex>
                );
              })}
            </Flex>
          )}
        </Flex>
      </Flex>
      <div className={classes.bottom_stock_box}>
        <BottomStock id={activateId} />
      </div>
    </div>
  );
}
