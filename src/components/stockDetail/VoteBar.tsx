import React from "react";
import classes from "../../styles/stock/Votebar.module.css";
import { Flex, Image } from "@mantine/core";
import ThumbsUp from "../../assets/img/stock/community/ThumbsUp.svg";
import ThumbsDown from "../../assets/img/stock/community/ThumbsDown.svg";

type Props = { leftAmount: number; rightAmount: number };

export default function VoteBar({ leftAmount, rightAmount }: Props) {
  const leftPercent = leftAmount / (leftAmount + rightAmount);
  const rightPercent = rightAmount / (leftAmount + rightAmount);

  function truncateToTwoDecimalPlaces(number: number) {
    const value = Math.floor(number * 1000) / 10;
    return Number.isInteger(value) ? value.toString() + ".0" : value;
  }

  return (
    <Flex direction={"column"} justify="center">
      <Flex
        direction={"row"}
        align="center"
        justify="center"
        style={{ position: "relative" }}
      >
        <Flex
          className={classes.vote_left}
          align="center"
          style={{ width: `${leftPercent * 50}vw`, paddingLeft: "10px" }}
        >
          <Image
            src={ThumbsUp}
            w={40}
            h={40}
            style={{ marginRight: "5px" }}
            className={classes.image_box}
          />
          <Flex direction={"column"} className={classes.vote_left_box}>
            <div className={classes.vote_text}>찬성</div>
            {truncateToTwoDecimalPlaces(leftPercent)}%
          </Flex>
        </Flex>
        <div className={classes.vote_vs}>vs</div>
        <Flex
          className={classes.vote_right}
          style={{ width: `${rightPercent * 50}vw`, paddingRight: "10px" }}
          align="center"
          justify="flex-end"
        >
          <Flex direction={"column"} className={classes.vote_right_box}>
            <div className={classes.vote_text}>반대</div>
            {truncateToTwoDecimalPlaces(rightPercent)}%
          </Flex>
          <Image
            src={ThumbsDown}
            w={40}
            h={40}
            style={{ marginLeft: "5px" }}
            className={classes.image_box}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
