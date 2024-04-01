import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoteBar from '../VoteBar';
import classes from '../../../styles/stock/StockTabCommunity.module.css';
import { Flex, Image } from '@mantine/core';
import ThumbsUpColor from '../../../assets/img/stock/community/ThumbsUpColor.svg';
import ThumbsDownColor from '../../../assets/img/stock/community/ThumbsDownColor.svg';
import { communityBykrxCode } from '../../../lib/apis/community';
import { getCommentByCommunityId } from '../../../lib/apis/comment';

type Props = { id: string };

type communityType = {
    codeId: string;
    endDate: string;
    id: number;
    isVoteType: string;
    numOfLikes: number;
    numOfParticipants: number;
    numOfUnlikes: number;
    startDate: string;
    voteTitle: string;
};
type commentType = {
    commentId: number;
    communityId: number;
    content: string;
    createdAt: string;
    id: number;
    isLiked: string;
    likeAmount: number;
    writerEmail: string;
    writerId: number;
    writerVoteType: string;
};

export default function StockCommunity({ id }: Props) {
    const navigate = useNavigate();
    const [communityInfo, setCommunityInfo] = useState<communityType>();
    const [commentList, setCommentList] = useState<commentType[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await communityBykrxCode(id);
            setCommunityInfo(response.data.result);
            const responseComment = await getCommentByCommunityId(response.data.result.id);
            console.log(responseComment.data);
            setCommentList(responseComment.data);
        };

        fetchData();
    }, []);

    return (
        <Flex direction={'column'} className={classes.stock_box}>
            <div className={classes.stock_title}>{communityInfo?.voteTitle}</div>
            <div className={classes.vote_bar}>
                {communityInfo && (
                    <VoteBar leftAmount={communityInfo.numOfLikes} rightAmount={communityInfo.numOfUnlikes} />
                )}
            </div>
            <div className={classes.vote_hr}>
                <hr />
            </div>
            <Flex direction={'column'} gap={10} className={classes.vote_bar}>
                {commentList?.map((value, idx) => {
                    if (idx <= 3) {
                        return (
                            <Flex key={value.id}>
                                {value.writerVoteType === 'LIKE' ? (
                                    <div className={classes.vote_img}>
                                        <Image src={ThumbsUpColor} />
                                    </div>
                                ) : (
                                    <div className={classes.vote_img}>
                                        <Image src={ThumbsDownColor} />
                                    </div>
                                )}
                                <div className={classes.vote_text}>{value.content}</div>
                            </Flex>
                        );
                    }
                    // index가 3을 초과하는 경우는 출력하지 않음
                    return null;
                })}
            </Flex>
            <button className={classes.vote_btn} onClick={() => navigate(`/stocks/${id}/community`)}>
                더 보기
            </button>
        </Flex>
    );
}
