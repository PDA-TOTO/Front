import { newsData } from './StockNews';
import { Flex, Image } from '@mantine/core';
import classes from '../../../styles/stock/news/News.module.css';
export default function NewsBox({
    articleId,
    body,
    datetime,
    imageOriginLink,
    officeId,
    officeName,
    title,
    photoType,
}: newsData) {
    const formatDate = (inputDate: string) => {
        const year = inputDate.substring(0, 4);
        const month = inputDate.substring(4, 6);
        const day = inputDate.substring(6, 8);
        const hour = inputDate.substring(8, 10);
        const minute = inputDate.substring(10, 12);

        const formattedDate = `${year}.${month}.${day} ${hour}:${minute}`;

        return formattedDate;
    };

    return (
        <Flex
            direction={'row'}
            className={classes.news_box}
            onClick={() => window.open(`https://n.news.naver.com/article/${officeId}/${articleId}`)}
        >
            <Flex direction={'column'} justify="space-between" className={classes.news_left}>
                <div className={classes.news_title}>{title.replaceAll('&quot;', '"')}</div>
                <div className={classes.news_content}>{body}</div>
                <Flex direction={'row'}>
                    <div className={classes.news_name}>{officeName}</div>
                    <div className={classes.news_time}>{formatDate(datetime)}</div>
                </Flex>
            </Flex>
            <div className={classes.news_size}>
                {photoType === 1 && <Image className={classes.news_img} src={imageOriginLink} />}
            </div>
        </Flex>
    );
}
