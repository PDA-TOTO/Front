import { Flex, Avatar, Image } from "@mantine/core";
import React from "react";
import classes from "../../styles/stock/Comment.module.css";
import ThumbsDownColor from "../../assets/img/stock/community/ThumbsDownColor.svg";
import ThumbsUpColor from "../../assets/img/stock/community/ThumbsUpColor.svg";
import Like from "../../assets/img/stock/community/Like.svg";
import LikeEmpty from "../../assets/img/stock/community/LikeEmpty.svg";

type Props = {
  id: number;
  userName: string;
  text: string;
  likeAmount: number;
  isLiked: boolean;
  time: number;
  vote: boolean;
};

export default function Comment({
  id,
  userName,
  text,
  likeAmount,
  isLiked,
  time,
  vote,
}: Props) {
  return (
    <Flex
      direction={"row"}
      align="flex-start"
      justify="center"
      className={classes.cmt_box}
    >
      <Avatar
        variant="filled"
        radius="xl"
        color="secondary.5"
        className={classes.cmt_avatar}
      />
      <Flex direction={"column"} gap={30}>
        <Flex direction={"row"} gap={10} align="center">
          <div className={classes.cmt_userName}>{userName}</div>
          <div className={classes.cmt_time}>{time}분전</div>
          {vote ? (
            <Image src={ThumbsUpColor} className={classes.cmt_vote_img} />
          ) : (
            <Image src={ThumbsDownColor} className={classes.cmt_vote_img} />
          )}
        </Flex>
        {text}
        <Flex direction={"row"} align="center">
          <div className={classes.cmt_like_div}>
            {isLiked ? (
              <Image src={Like} className={classes.cmt_like} />
            ) : (
              <Image src={LikeEmpty} className={classes.cmt_like} />
            )}
          </div>
          <div className={classes.like_amount}>{likeAmount}</div>
        </Flex>
      </Flex>
    </Flex>
  );
}
