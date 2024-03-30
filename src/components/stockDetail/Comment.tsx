import { Flex, Avatar, Image } from "@mantine/core";
import React from "react";
import classes from "../../styles/stock/Comment.module.css";
import ThumbsDownColor from "../../assets/img/stock/community/ThumbsDownColor.svg";
import ThumbsUpColor from "../../assets/img/stock/community/ThumbsUpColor.svg";
import Like from "../../assets/img/stock/community/Like.svg";
import LikeEmpty from "../../assets/img/stock/community/LikeEmpty.svg";

type Props = {
  id: number;
  writerEmail: string;
  content: string;
  likeAmount: number;
  isLiked: string;
  createdAt: string;
  writerVoteType: string;
  onLikeClick: () => void;
};

export default function Comment({
  id,
  writerEmail,
  content,
  likeAmount,
  isLiked,
  createdAt,
  writerVoteType,
  onLikeClick,
}: Props) {
  const calculateTimeDifference = (dateTimeString: string): string => {
    const date: Date = new Date(dateTimeString);
    const now: Date = new Date();

    const diffMs: number = now.getTime() - 9 * 60 * 60 * 1000 - date.getTime(); // Convert dates to timestamps
    const diffMinutes: number = Math.floor(diffMs / (1000 * 60));
    const diffHours: number = Math.floor(diffMinutes / 60);
    const diffDays: number = Math.floor(diffHours / 24);

    if (dateTimeString === "0") {
      return "방금 전";
    }

    if (diffDays > 0) {
      return diffDays === 1 ? "하루 전" : `${diffDays}일 전`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? "한 시간 전" : `${diffHours}시간 전`;
    } else if (diffMinutes > 0) {
      return diffMinutes === 1 ? "1분 전" : `${diffMinutes}분 전`;
    } else {
      return "방금 전";
    }
  };

  return (
    <Flex
      direction={"row"}
      align="flex-start"
      // justify="center"
      className={classes.cmt_box}
    >
      <Avatar
        variant="filled"
        radius="xl"
        color="secondary.5"
        className={classes.cmt_avatar}
      />
      <Flex direction={"column"} gap={20} style={{ width: "100%" }}>
        <Flex direction={"row"} gap={10} align="center">
          <div className={classes.cmt_writerEmail}>{writerEmail}</div>
          <div className={classes.cmt_time}>
            {calculateTimeDifference(createdAt)}
          </div>
          {writerVoteType === "LIKE" ? (
            <Image src={ThumbsUpColor} className={classes.cmt_vote_img} />
          ) : (
            <Image src={ThumbsDownColor} className={classes.cmt_vote_img} />
          )}
        </Flex>
        {content}
        <Flex style={{ width: "100%" }} justify="flex-end">
          <Flex direction={"row"} align="center">
            <div
              className={classes.cmt_like_div}
              onClick={onLikeClick}
              style={{ cursor: "pointer" }}
            >
              {isLiked === "LIKE" ? (
                <Image src={Like} className={classes.cmt_like} />
              ) : (
                <Image src={LikeEmpty} className={classes.cmt_like} />
              )}
            </div>
            <div className={classes.like_amount}>{likeAmount}</div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
