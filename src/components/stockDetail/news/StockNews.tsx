import React, { useEffect, useState } from "react";
import NewsBox from "./NewsBox";

type Props = { id: string };

export interface newsData {
  id: number;
  title: string;
  content: string;
  newsName: string;
  newsImg: string;
  time: string;
  newsLink: string;
}

const dummyNews = [
  {
    id: 1,
    title: "외신 '메타, 삼성 파운드리 고객된다'…",
    content:
      "마크 저커버그 메타 최고경영자(CEO)의 방한 후, 메타와 삼성전자 파운드리(반도체 위탁생산)간 협력에 대한 외신 보도가 나왔다. 파운드리 시장을 두고 TSMC와",
    newsName: "파이낸셜뉴스",
    newsImg:
      "https://imgnews.pstatic.net/image/origin/421/2024/03/21/7427442.jpg?type=nf220_150",
    time: "1711002244761",
    newsLink: "https://n.news.naver.com/article/421/0007427442",
  },
  {
    id: 2,
    title: "외신 '메타, 삼성 파운드리 고객된다'…",
    content:
      "마크 저커버그 메타 최고경영자(CEO)의 방한 후, 메타와 삼성전자 파운드리(반도체 위탁생산)간 협력에 대한 외신 보도가 나왔다. 파운드리 시장을 두고 TSMC와",
    newsName: "파이낸셜뉴스",
    newsImg:
      "https://imgnews.pstatic.net/image/origin/421/2024/03/21/7427442.jpg?type=nf220_150",
    time: "1711002244761",
    newsLink: "https://n.news.naver.com/article/421/0007427442",
  },
  {
    id: 3,
    title: "외신 '메타, 삼성 파운드리 고객된다'…",
    content:
      "마크 저커버그 메타 최고경영자(CEO)의 방한 후, 메타와 삼성전자 파운드리(반도체 위탁생산)간 협력에 대한 외신 보도가 나왔다. 파운드리 시장을 두고 TSMC와",
    newsName: "파이낸셜뉴스",
    newsImg:
      "https://imgnews.pstatic.net/image/origin/421/2024/03/21/7427442.jpg?type=nf220_150",
    time: "1711002244761",
    newsLink: "https://n.news.naver.com/article/421/0007427442",
  },
];

export default function StockNews({ id }: Props) {
  const [newsList, setNewsList] = useState<newsData[]>([]);
  useEffect(() => {
    setNewsList(dummyNews);
  }, []);
  return (
    <div>
      {newsList?.map((news, idx) => {
        return (
          <div key={idx}>
            <NewsBox
              id={news.id}
              title={news.title}
              content={news.content}
              time={news.time}
              newsImg={news.newsImg}
              newsName={news.newsName}
              newsLink={news.newsLink}
            />
          </div>
        );
      })}
    </div>
  );
}
