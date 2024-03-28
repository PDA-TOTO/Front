import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../../styles/stock/Community.module.css";
import { Flex, Image, Select, Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import headCount from "../../assets/img/stock/community/headCount.svg";
import date from "../../assets/img/stock/community/date.svg";
import VoteBar from "../../components/stockDetail/VoteBar";
import Comment from "../../components/stockDetail/Comment";
import ThumbsUp2 from "../../assets/img/stock/community/ThumbsUp2.svg";
import ThumbsDown2 from "../../assets/img/stock/community/ThumbsDown2.svg";
import Check from "../../assets/img/stock/community/Check.svg";
import ErrorTextArea from "../../assets/img/stock/community/ErrorTextArea.svg";
type Props = {};

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

export default function CommunityPage({}: Props) {
  const params = useParams();
  const MAX_LENGTH = 100;
  const [value, setValue] = useState<string | null>("");
  const [leftCnt, setLeftCnt] = useState<number>(100);
  const [rightCnt, setRightCnt] = useState<number>(120);
  const [userVote, setUserVote] = useState<string>("none"); // none, left, right
  const [writeToggle, setWriteToggle] = useState<boolean>(false);
  const [commentList, setCommentList] = useState(commetDummy);
  const [commentText, setCommentText] = useState("");
  const [textAreaError, setTextAreaError] = useState(false);
  const handleVoteChange = (vote: string) => {
    let title = "";
    let message = "";

    if (userVote === vote) {
      title = "투표가 완료되었습니다!";
      message = "투표는 한 번만 할 수 있어요 😀";
    } else {
      if (vote === "left") {
        title = "왜 찬성을 선택하셨나요?";
        message = "이유를 공유해주세요 😀";
        setLeftCnt((prev) => prev + 1);
        if (userVote === "right") {
          setRightCnt((prev) => prev - 1);
        }
      } else if (vote === "right") {
        title = "왜 반대를 선택하셨나요?";
        message = "이유를 공유해주세요 😀";
        setRightCnt((prev) => prev + 1);
        if (userVote === "left") {
          setLeftCnt((prev) => prev - 1);
        }
      }
      setUserVote(vote);
    }

    notifications.show({
      title: title,
      message: message,
      autoClose: 3000,
      radius: "md",
      color:
        userVote === vote ? "primary.5" : vote === "left" ? "red.5" : "blue.5",
    });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_LENGTH) {
      setCommentText(text);
      setTextAreaError(false);
    } else {
      setTextAreaError(true);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") {
      return;
    }
    const newComment = {
      id: commentList.length + 1,
      userName: "사용자",
      text: commentText.trim(),
      likeAmount: 0,
      isLiked: false,
      time: 0,
      vote: userVote === "left" ? true : false,
    };
    setCommentList((prevList) => [...prevList, newComment]);
    setCommentText("");
    setWriteToggle((prev) => !prev);
  };

  const handleLikeClick = (index: number, isLiked: boolean) => {
    setCommentList((prevList) =>
      prevList.map((item, idx) =>
        item.id === index
          ? {
              ...item,
              likeAmount: !isLiked ? item.likeAmount + 1 : item.likeAmount - 1,
              isLiked: !isLiked,
            }
          : item
      )
    );
  };

  return (
    <Flex
      direction={"column"}
      justify="center"
      align="center"
      className={classes.community_flex}
    >
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
        <Flex
          direction={"column"}
          justify="center"
          align="center"
          className={classes.vote_header}
        >
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
          <VoteBar leftAmount={leftCnt} rightAmount={rightCnt} />
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
              {userVote === "left" && (
                <div className={classes.vote_check}>
                  <Image src={Check} />
                </div>
              )}
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
              {userVote === "right" && (
                <div className={classes.vote_check}>
                  <Image src={Check} />
                </div>
              )}
            </Flex>
          </Flex>
        </Flex>
        {/* <hr className={classes.main_hr} /> */}
        <Flex
          justify="space-between"
          align="center"
          className={classes.main_flex}
          style={{ paddingTop: "20px" }}
        >
          <div
            className={classes.main_btn_write}
            onClick={() => setWriteToggle((prev) => !prev)}
          >
            작성하기
          </div>
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
        {writeToggle &&
          (userVote === "none" ? (
            <Flex
              direction={"column"}
              justify="center"
              className={classes.write_none_flex}
            >
              <div className={classes.write_none_1}>
                아직 투표가 완료되지 않았어요!
              </div>
              <div className={classes.write_none_2}>
                위에서 투표를 끝내고 이유를 작성해주세요 😀
              </div>
            </Flex>
          ) : (
            <Flex direction={"column"} justify="center" align="center">
              <Flex direction={"column"} align="flex-start">
                {userVote === "left" && (
                  <Flex className={classes.write_1} align="center">
                    <div className={classes.write_badge_red}>찬성</div>을 선택한
                    이유를 써주세요!
                  </Flex>
                )}
                {userVote === "right" && (
                  <Flex align="center" className={classes.write_1}>
                    <div className={classes.write_badge_blue}>반대</div>를
                    선택한 이유를 써주세요!
                  </Flex>
                )}
                <textarea
                  value={commentText}
                  onChange={handleCommentChange}
                  className={classes.comment_text}
                  placeholder="100자 이하로 작성해주세요."
                />
                {textAreaError && (
                  <Flex direction={"row"} className={classes.error_textarea}>
                    <div className={classes.error_text_img}>
                      <Image src={ErrorTextArea} />
                    </div>
                    100자 이하로 작성해주세요
                  </Flex>
                )}
              </Flex>
              <button
                className={classes.comment_btn}
                onClick={handleCommentSubmit}
              >
                작성 완료
              </button>
            </Flex>
          ))}
        <div className={classes.cmt_padding} />
        {commentList
          ?.slice()
          .reverse()
          .map((value, index) => {
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
                  onLikeClick={() => handleLikeClick(value.id, value.isLiked)}
                />
                {/* <hr style={{ width: "55vw" }} /> */}
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
}
