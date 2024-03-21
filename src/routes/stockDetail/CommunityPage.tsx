import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../../styles/stock/Community.module.css";
import { Flex, Image, Select, Alert } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import headCount from "../../assets/img/stock/community/headCount.svg";
import date from "../../assets/img/stock/community/date.svg";
import VoteBar from "../../components/stockDetail/VoteBar";
import Comment from "../../components/stockDetail/Comment";
import ThumbsUp2 from "../../assets/img/stock/community/ThumbsUp2.svg";
import ThumbsDown2 from "../../assets/img/stock/community/ThumbsDown2.svg";
type Props = {};

export default function CommunityPage({}: Props) {
  const params = useParams();
  const [value, setValue] = useState<string | null>("");
  const [leftCnt, setLeftCnt] = useState<number>(100);
  const [rightCnt, setRightCnt] = useState<number>(120);
  const [userVote, setUserVote] = useState<string>("none"); // none, left, right
  const handleVoteChange = (vote: string) => {
    if (userVote === vote) {
      notifications.show({
        title: "투표가 완료되었습니다!",
        message: "투표는 한 번만 할 수 있어요 😀",
        autoClose: 3000,
        radius: "md",
        color: "primary.5",
      });
      return;
    }
    if (vote === "left") {
      notifications.show({
        title: "투표가 완료되었습니다!",
        message: "왜 찬성을 선택하셨나요? 이유를 공유해주세요 😀",
        autoClose: 3000,
        radius: "md",
        color: "red.5",
      });
      setLeftCnt((prev) => prev + 1);
      if (userVote === "right") {
        setRightCnt((prev) => prev - 1);
      }
    } else if (vote === "right") {
      notifications.show({
        title: "투표가 완료되었습니다!",
        message: "왜 반대를 선택하셨나요? 이유를 공유해주세요 😀",
        autoClose: 3000,
        radius: "md",
        color: "blue.5",
      });
      setRightCnt((prev) => prev + 1);
      if (userVote === "left") {
        setRightCnt((prev) => prev - 1);
      }
    }
    setUserVote(vote);
  };

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
    <Flex direction={"column"} justify="center" align="center">
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
          <VoteBar leftAmount={leftCnt} rightAmount={rightCnt} />
        </div>
        <Flex style={{ paddingTop: "20px" }}>
          <Flex
            className={classes.vote_v1}
            onClick={() => handleVoteChange("left")}
            justify="center"
            align="center"
          >
            찬성
            <div className={classes.vote_v_img}>
              <Image src={ThumbsUp2} />
            </div>
          </Flex>
          <div className={classes.vote_v_pd} />
          <Flex
            className={classes.vote_v2}
            justify="center"
            align="center"
            onClick={() => handleVoteChange("right")}
          >
            반대
            <div className={classes.vote_v_img}>
              <Image src={ThumbsDown2} />
            </div>
          </Flex>
        </Flex>
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
              {/* <hr style={{ width: "55vw" }} /> */}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
