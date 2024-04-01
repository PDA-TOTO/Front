import { Stack, Text } from '@mantine/core';
import { useStockDetailSelector } from '../../lib/hooks/stockReduxHooks';
import { getNaverStockInfo } from '../../lib/apis/community';
import { useState, useEffect } from 'react';

type StockTitleProps = {
    name: string;
    price: number;
    percent: number;
    stockId: string;
    stockData: any[];
};

type stockWebsocketType = {
    bidp1: string;
};
const StockTitle: React.FC<StockTitleProps> = ({ name, stockId, stockData }: StockTitleProps) => {
    const [_, setClosePrice] = useState<string>('');
    const [currentPercent, setCurrentPercent] = useState<number>(0);
    const stockWebSocket: stockWebsocketType = useStockDetailSelector((state) => state.stockWebSocket);
    const calculatePercentageChange = (firstNumber: number, secondNumber: number) => {
        if (secondNumber === 0) {
            return 0;
        }

        const change = ((firstNumber - secondNumber) / secondNumber) * 100;
        console.log('stock bidpq:', firstNumber, 'naver close:', secondNumber, 'change:', change);
        return change > 0 ? Number(change.toFixed(2)) : Number(change.toFixed(2));
    };
    useEffect(() => {
        stockData.length > 0 && console.log('[chart]', stockData[0].price_ePr);
        stockId &&
            getNaverStockInfo(stockId).then((response) => {
                setClosePrice(response.data.closePrice);
                const NumberBidp1 = Number(stockWebSocket.bidp1);

                if (stockData.length > 0) {
                    const secondNumber = Number(stockData[0].price_ePr);

                    const calP: number = calculatePercentageChange(NumberBidp1, secondNumber);
                    setCurrentPercent(calP);
                }
                console.log('stockWebSocket.bidp1', stockWebSocket.bidp1);
            });
    }, [stockWebSocket.bidp1]);

    return (
        <Stack m={0} gap={0}>
            <Text size="lg">{name}</Text>
            <Text size="xxl" fw="bolder">{`${
                stockWebSocket.bidp1.toLocaleString() === '' ? '-' : `${Number(stockWebSocket.bidp1).toLocaleString()}`
            } 원`}</Text>
            <Text c={currentPercent < 0 ? 'blue' : 'red'}>{`${currentPercent < 0 ? '' : '+'}${currentPercent} %`}</Text>
        </Stack>
    );
};

export default StockTitle;
