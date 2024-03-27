import React, { useEffect, useState } from 'react';
import NewsBox from './NewsBox';
import { stockNews } from '../../../lib/apis/stock';

type Props = { id: string };

export interface newsData {
    articleId: string;
    body: string;
    datetime: string;
    id: string;
    imageOriginLink: string;
    officeId: string;
    officeName: string;
    title: string;
    titleFull: string;
    photoType: number;
}

export interface newsGroup {
    total: number;
    items: newsData[];
}

export default function StockNews({ id }: Props) {
    const [newsList, setNewsList] = useState<newsGroup[]>([]);
    useEffect(() => {
        stockNews(id).then((response) => {
            setNewsList(response.data);
            console.log(response.data);
        });
    }, []);
    return (
        <div>
            {newsList?.map((news, idx) => {
                return (
                    <div key={news.items[0].id}>
                        <NewsBox
                            articleId={news.items[0].articleId}
                            id={news.items[0].id}
                            title={news.items[0].title}
                            body={news.items[0].body}
                            datetime={news.items[0].datetime}
                            imageOriginLink={news.items[0].imageOriginLink}
                            officeName={news.items[0].officeName}
                            officeId={news.items[0].officeId}
                            titleFull={news.items[0].titleFull}
                            photoType={news.items[0].photoType}
                        />
                    </div>
                );
            })}
        </div>
    );
}
