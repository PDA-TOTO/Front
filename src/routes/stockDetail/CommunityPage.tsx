import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../../styles/stock/Community.module.css";
import { Flex, Image, Select, Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import headCount from "../../assets/img/stock/community/headCount.svg";
import { communityBykrxCode } from "../../lib/apis/community";
import date from "../../assets/img/stock/community/date.svg";
import VoteBar from "../../components/stockDetail/VoteBar";
import Comment from "../../components/stockDetail/Comment";
import ThumbsUp2 from "../../assets/img/stock/community/ThumbsUp2.svg";
import ThumbsDown2 from "../../assets/img/stock/community/ThumbsDown2.svg";
import Check from "../../assets/img/stock/community/Check.svg";
import ErrorTextArea from "../../assets/img/stock/community/ErrorTextArea.svg";
import { voteChange, getNaverStockInfo } from "../../lib/apis/community";
import {
  getCommentByCommunityId,
  saveComment,
  likeComment,
} from "../../lib/apis/comment";
import { useStockDetailSelector } from "../../lib/hooks/stockReduxHooks";
import { PersistState } from "../../store/store";
export interface community {
  id: number;
  codeId: string;
  voteTitle: string;
  startDate: string;
  endDate: string;
  numOfParticipants: number;
  numOfLikes: number;
  numOfUnlikes: number;
  isVoteType: string;
  stockCodeName: string;
}
export interface communityInfoType {
  success: boolean;
  message: string;
  result: community;
}
export interface commentType {
  id: number;
  writerEmail: string;
  content: string;
  likeAmount: number;
  isLiked: string;
  createdAt: string;
  writerVoteType: string;
}
export interface naverStockInfo {
  fluctuationsRatio: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  marketStatus: string;
}
export default function CommunityPage({}) {
  const { id } = useParams();
  const MAX_LENGTH = 100;
  const [communityInfo, setCommunityInfo] = useState<communityInfoType>();
  const [value, setValue] = useState<string | null>("최신순");
  const [likeCnt, setLikeCnt] = useState<number>(100);
  const [unlikeCnt, setUnlikeCnt] = useState<number>(120);
  const [userVote, setUserVote] = useState<string>("NONE"); // NONE, left, right
  const [writeToggle, setWriteToggle] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<commentType[]>([]);
  const [commentLikedList, setCommentLikedList] = useState<commentType[]>([]);
  const [commentText, setCommentText] = useState("");
  const [textAreaError, setTextAreaError] = useState(false);
  const [naverStockInfo, setNaverStockInfo] = useState<naverStockInfo>();
  const handleVoteChange = (vote: string) => {
    let title = "";
    let message = "";

    if (userVote === vote) {
      title = "투표가 완료되었습니다!";
      message = "투표는 한 번만 할 수 있어요 😀";
    } else {
      if (vote === "LIKE") {
        title = "왜 찬성을 선택하셨나요?";
        message = "이유를 공유해주세요 😀";
        setLikeCnt((prev) => prev + 1);
        id &&
          communityInfo &&
          voteChange(id, communityInfo.result.id, "LIKE").then((data) =>
            console.log("vote:", data)
          );
        if (userVote === "UNLIKE") {
          setUnlikeCnt((prev) => prev - 1);
        }
      } else if (vote === "UNLIKE") {
        title = "왜 반대를 선택하셨나요?";
        message = "이유를 공유해주세요 😀";
        setUnlikeCnt((prev) => prev + 1);
        id &&
          communityInfo &&
          voteChange(id, communityInfo?.result.id, "UNLIKE").then((data) =>
            console.log("vote:", data)
          );
        if (userVote === "LIKE") {
          setLikeCnt((prev) => prev - 1);
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
        userVote === vote ? "primary.5" : vote === "LIKE" ? "red.5" : "blue.5",
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
      id:
        commentList.length > 0 ? commentList[commentList.length - 1].id + 1 : 1,
      writerEmail: "나",
      content: commentText.trim(),
      likeAmount: 0,
      isLiked: "UNLIKE",
      createdAt: "0",
      writerVoteType: userVote,
    };
    setCommentList((prevList) => [...prevList, newComment]);
    communityInfo &&
      saveComment(communityInfo.result.id, commentText.trim()).then(
        (response) => {
          console.log(response.data);
        }
      );
    setCommentText("");
    setWriteToggle((prev) => !prev);
  };

  const handleLikeClick = (index: number, isLiked: string) => {
    setCommentLikedList((prevList) =>
      prevList.map((item, idx) =>
        item.id === index
          ? {
              ...item,
              likeAmount:
                isLiked === "LIKE" ? item.likeAmount - 1 : item.likeAmount + 1,
              isLiked: isLiked === "UNLIKE" ? "LIKE" : "UNLIKE",
            }
          : item
      )
    );
    setCommentList((prevList) =>
      prevList.map((item, idx) =>
        item.id === index
          ? {
              ...item,
              likeAmount:
                isLiked === "LIKE" ? item.likeAmount - 1 : item.likeAmount + 1,
              isLiked: isLiked === "UNLIKE" ? "LIKE" : "UNLIKE",
            }
          : item
      )
    );
    likeComment(index, isLiked === "UNLIKE" ? "LIKE" : "UNLIKE").then(
      (response) => {
        console.log(response.data);
      }
    );
  };

  const calculateCurrentPrice = (
    closePrice: string,
    compareToPreviousClosePrice: string
  ) => {
    const closePriceNumber = Number(closePrice.replace(/,/g, ""));
    const compareToPreviousClosePriceNumber = Number(
      compareToPreviousClosePrice.replace(/,/g, "")
    );
    return closePriceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    id &&
      communityBykrxCode(id).then((response) => {
        setCommunityInfo(response.data);
        console.log(response.data.result);
        setLikeCnt(response.data.result.numOfLikes);
        setUnlikeCnt(response.data.result.numOfUnlikes);
        setUserVote(response.data.result.isVoteType);
        getCommentByCommunityId(response.data.result.id).then((response) => {
          const sortedCommentList2 = [...response.data].sort(
            (a: commentType, b: commentType) => a.id - b.id
          );
          const sortedCommentList = [...response.data].sort(
            (a: commentType, b: commentType) => b.likeAmount - a.likeAmount
          );
          setCommentLikedList(sortedCommentList);
          setCommentList(sortedCommentList2);
        });
      });
    id &&
      getNaverStockInfo(id).then((response) => {
        console.log(response.data);
        setNaverStockInfo(response.data);
      });
  }, []);

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
        <div className={classes.header_title}>
          {communityInfo?.result.stockCodeName}
        </div>
        <Flex direction={"row"}>
          <div className={classes.header_price}>
            {naverStockInfo && naverStockInfo.marketStatus === "CLOSE"
              ? naverStockInfo.closePrice
              : naverStockInfo &&
                calculateCurrentPrice(
                  naverStockInfo.closePrice,
                  naverStockInfo.compareToPreviousClosePrice
                )}
            원
          </div>
          <div
            className={
              Number(naverStockInfo?.fluctuationsRatio) > 0
                ? classes.header_percent_plus
                : classes.header_percent_minus
            }
          >
            {Number(naverStockInfo?.fluctuationsRatio) > 0 && "+"}
            {naverStockInfo?.fluctuationsRatio}%
          </div>
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
          <div className={classes.main_title}>
            {communityInfo?.result.voteTitle}
          </div>
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
            {communityInfo && (
              <div>{communityInfo.result.numOfParticipants}명 참여 중</div>
            )}
          </Flex>
          <Flex direction={"row"}>
            <Image src={date} h={20} w="auto" style={{ paddingRight: "5px" }} />
            <div className={classes.main_date}>
              {communityInfo?.result.startDate} ~{" "}
              {communityInfo?.result.endDate}
            </div>
          </Flex>
          <div className={classes.main_padding} />
          {communityInfo && (
            <VoteBar leftAmount={likeCnt} rightAmount={unlikeCnt} />
          )}
          <Flex style={{ paddingTop: "20px" }}>
            <Flex
              className={classes.vote_v1}
              onClick={() => handleVoteChange("LIKE")}
              justify="center"
              align="center"
            >
              찬성
              <div className={classes.vote_v_img}>
                <Image src={ThumbsUp2} />
              </div>
              {userVote === "LIKE" && (
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
              onClick={() => handleVoteChange("UNLIKE")}
            >
              반대
              <div className={classes.vote_v_img}>
                <Image src={ThumbsDown2} />
              </div>
              {userVote === "UNLIKE" && (
                <div className={classes.vote_check}>
                  <Image src={Check} />
                </div>
              )}
            </Flex>
          </Flex>
        </Flex>
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
          (userVote === "NONE" ? (
            <Flex
              direction={"column"}
              justify="center"
              className={classes.write_NONE_flex}
            >
              <div className={classes.write_NONE_1}>
                아직 투표가 완료되지 않았어요!
              </div>
              <div className={classes.write_NONE_2}>
                위에서 투표를 끝내고 이유를 작성해주세요 😀
              </div>
            </Flex>
          ) : (
            <Flex direction={"column"} justify="center" align="center">
              <Flex direction={"column"} align="flex-start">
                {userVote === "LIKE" && (
                  <Flex className={classes.write_1} align="center">
                    <div className={classes.write_badge_red}>찬성</div>을 선택한
                    이유를 써주세요!
                  </Flex>
                )}
                {userVote === "UNLIKE" && (
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
        {commentList?.length === 0 && (
          <Flex direction={"column"} justify="center" align="center">
            <div className={classes.cmt_0_title}>아직 댓글이 없어요!</div>
            투표하고 첫 댓글을 작성해보세요😀
          </Flex>
        )}
        {value === "최신순"
          ? commentList
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
                      writerEmail={value.writerEmail}
                      content={value.content}
                      likeAmount={value.likeAmount}
                      isLiked={value.isLiked}
                      createdAt={value.createdAt}
                      writerVoteType={value.writerVoteType}
                      onLikeClick={() =>
                        handleLikeClick(value.id, value.isLiked)
                      }
                    />
                  </Flex>
                );
              })
          : commentLikedList?.slice().map((value, index) => {
              return (
                <Flex
                  key={value.id}
                  direction={"column"}
                  justify="center"
                  align="center"
                >
                  <Comment
                    id={value.id}
                    writerEmail={value.writerEmail}
                    content={value.content}
                    likeAmount={value.likeAmount}
                    isLiked={value.isLiked}
                    createdAt={value.createdAt}
                    writerVoteType={value.writerVoteType}
                    onLikeClick={() => handleLikeClick(value.id, value.isLiked)}
                  />
                </Flex>
              );
            })}
      </Flex>
    </Flex>
  );
}
