import React from "react";
import classes from "../../../styles/stock/common/LockInfo.module.css";
import { Flex, Image } from "@mantine/core";
import lock from "../../../assets/img/stock/lock/lock.svg";
import { useNavigate } from "react-router";

type Props = {
  tabName: string;
  imgLink: string;
};

export default function LockInfo({ tabName, imgLink }: Props) {
  const navigate = useNavigate();
  return (
    <Flex
      direction={"column"}
      justify="center"
      align="center"
      className={classes.lock_box}
    >
      <Image src={imgLink} className={classes.lock_img_blur} />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        className={classes.lock_box_2}
      >
        <Flex
          direction={"row"}
          justify="center"
          align="center"
          className={classes.lock_title}
        >
          <div className={classes.lock_img}>
            <Image src={lock} />
          </div>
          아직 {tabName} 탭을 이용하실 수 없어요🥲{" "}
        </Flex>
        <Flex
          direction={"column"}
          align="center"
          className={classes.lock_content}
        >
          <div>
            투투는 여러분들이 해당 서비스가 왜 필요한지 느꼈으면 좋겠어요
          </div>
          <div>아래의 활동을 통해서 투자 지식을 늘리고 해금할 수 있어요!</div>
        </Flex>
        <Flex direction={"row"}>
          <button className={`${classes.lock_btn1} ${classes.lock_btn}`}>
            커뮤니티
          </button>
          <button className={`${classes.lock_btn2} ${classes.lock_btn}`}>
            퀴즈
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
}
