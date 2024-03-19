import React from "react";
import { useParams } from "react-router-dom";
import classes from "../../styles/stock/Community.module.css";
import { Flex, Image } from "@mantine/core";
import headCount from "../../assets/img/stock/community/headCount.svg";
import date from "../../assets/img/stock/community/date.svg";
import VoteBar from "../../components/stockDetail/VoteBar";
type Props = {};

export default function CommunityPage({}: Props) {
  const params = useParams();
  console.log(params.id);
  return (
    <div>
      <Flex
        direction={"column"}
        justify="center"
        align="center"
        className={classes.header}
      >
        <div className={classes.header_title}>삼성전자</div>
        <Flex direction={"row"}>
          <div className={classes.header_price}>73,000원</div>
          <div className={classes.header_percent}>+1.1%</div>
        </Flex>
      </Flex>
      <Flex className={classes.main} direction={"column"} align="center">
        <div className={classes.main_header}>투표</div>
        <div className={classes.main_title}>삼성전자 다시 오를까?</div>
        <Flex
          direction={"row"}
          justify="center"
          className={classes.main_headcount}
        >
          <Image
            src={headCount}
            h={20}
            w="auto"
            style={{ paddingRight: "5px" }}
          />
          3,789명 참여 중
        </Flex>
        <Flex direction={"row"}>
          <Image src={date} h={20} w="auto" style={{ paddingRight: "5px" }} />
          <div className={classes.main_date}>2024.03.08 ~ 2024.03.15</div>
        </Flex>
        <div className={classes.main_padding} />
        <VoteBar leftAmount={100} rightAmount={300} />
      </Flex>
    </div>
  );
}
