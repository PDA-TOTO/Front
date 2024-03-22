import React from "react";
import { newsData } from "./StockNews";
import { Flex, Image } from "@mantine/core";
import classes from "../../../styles/stock/news/News.module.css";
import { useNavigate } from "react-router";
type Props = {};

export default function NewsBox({
  id,
  title,
  content,
  newsName,
  newsImg,
  time,
  newsLink,
}: newsData) {
  const navigate = useNavigate();
  return (
    <Flex
      direction={"row"}
      className={classes.news_box}
      onClick={() => window.open(`${newsLink}`)}
    >
      <Flex direction={"column"} justify="space-between">
        <div className={classes.news_title}>{title}</div>
        <div className={classes.news_content}>{content}</div>
        <Flex direction={"row"}>
          <div className={classes.news_name}>{newsName}</div>
          <div className={classes.news_time}>{time}</div>
        </Flex>
      </Flex>
      <div>
        <Image className={classes.news_img} src={newsImg} />
      </div>
    </Flex>
  );
}
