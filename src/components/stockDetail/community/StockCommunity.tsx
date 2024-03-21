import React from "react";
import { useNavigate } from "react-router-dom";
import VoteBar from "../VoteBar";
import classes from "../../../styles/stock/StockTabCommunity.module.css";
import { Flex, Image } from "@mantine/core";
import ThumbsUpColor from "../../../assets/img/stock/community/ThumbsUpColor.svg";
import ThumbsDownColor from "../../../assets/img/stock/community/ThumbsDownColor.svg";

type Props = { id: string };

export default function StockCommunity({ id }: Props) {
  const navigate = useNavigate();
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
      text: "전자 짱~",
      likeAmount: 3,
      isLiked: true,
      time: 25,
      vote: false,
    },
    {
      id: 3,
      userName: "email",
      text: "LG 전자가 더 좋은 거 같아요!",
      likeAmount: 3,
      isLiked: false,
      time: 25,
      vote: true,
    },
  ];
  return (
    <Flex direction={"column"} className={classes.stock_box}>
      <div className={classes.stock_title}>삼성전자 다시 오를까?</div>
      <div className={classes.vote_bar}>
        <VoteBar leftAmount={120} rightAmount={190} />
      </div>
      <div className={classes.vote_hr}>
        <hr />
      </div>
      <Flex direction={"column"} gap={10} className={classes.vote_bar}>
        {commetDummy.map((value, idx) => {
          return (
            <Flex key={value.id}>
              {value.vote ? (
                <div className={classes.vote_img}>
                  <Image src={ThumbsUpColor} />
                </div>
              ) : (
                <div className={classes.vote_img}>
                  <Image src={ThumbsDownColor} />
                </div>
              )}
              <div className={classes.vote_text}>{value.text}</div>
            </Flex>
          );
        })}
      </Flex>
      <button
        className={classes.vote_btn}
        onClick={() => navigate(`/stocks/${id}/community`)}
      >
        더 보기
      </button>
    </Flex>
  );
}
