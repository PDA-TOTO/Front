import React, { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../../styles/stock/Community.module.css";
import { Flex, Image, Select } from "@mantine/core";
import headCount from "../../assets/img/stock/community/headCount.svg";
import date from "../../assets/img/stock/community/date.svg";
import VoteBar from "../../components/stockDetail/VoteBar";
import Comment from "../../components/stockDetail/Comment";
type Props = {};

export default function CommunityPage({}: Props) {
  const params = useParams();
  const [value, setValue] = useState<string | null>("");
  const commetDummy = [
    {
      id: 1,
      userName: "email",
      text: "이번에 ㄱㄹㅅ 폭발했다던데 그거 때문에 내려간듯",
      likeAmount: 3,
      isLiked: true,
      time: 25,
      vote: true,
    },
    {
      id: 2,
      userName: "email",
      text: "이번에 ㄱㄹㅅ 폭발했다던데 그거 때문에 내려간듯",
      likeAmount: 3,
      isLiked: true,
      time: 25,
      vote: false,
    },
    {
      id: 3,
      userName: "email",
      text: "이번에 ㄱㄹㅅ 폭발했다던데 그거 때문에 내려간듯",
      likeAmount: 3,
      isLiked: false,
      time: 25,
      vote: true,
    },
  ];
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
        <div style={{ width: "90vw" }}>
          <VoteBar leftAmount={30} rightAmount={10} />
        </div>
        <hr className={classes.main_hr} />
        <Flex
          justify="space-between"
          align="center"
          className={classes.main_flex}
          style={{ paddingTop: "20px" }}
        >
          <div className={classes.main_btn_write}>작성하기</div>
          <div className={classes.main_debate}>토론</div>
          <div className={classes.main_filter}>
            <Select
              placeholder="최신순"
              data={["최신순", "인기순"]}
              value={value}
              onChange={setValue}
              className={classes.main_select}
            />
          </div>
        </Flex>
        <div className={classes.cmt_padding} />
        {commetDummy.map((value, index) => {
          return (
            <Flex
              key={value.id}
              direction={"column"}
              justify="center"
              align="center"
            >
              <Comment
                id={value.id}
                userName={value.userName}
                text={value.text}
                likeAmount={value.likeAmount}
                isLiked={value.isLiked}
                time={value.time}
                vote={value.vote}
              />
              <hr style={{ width: "55vw" }} />
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
}