import { Grid, Group, Stack, Switch } from '@mantine/core';
import StickyTrading from '../../components/stockDetail/StickyTrading';
import { useParams } from 'react-router-dom';
import StockTitle from '../../components/stockDetail/StockTitle';
import { useEffect, useState } from 'react';
import { useElementSize, useToggle } from '@mantine/hooks';
import StockNav from '../../components/stockDetail/StockNav';
import StockChart from '../../components/stockDetail/StockChart';
import { useStockDetailDispatch } from '../../lib/hooks/stockReduxHooks';
import { setPrice } from '../../store/reducers/stockControlReducers';

type StockInfo = {
    name: string;
    price: number;
    percent: number;
};

const StockDetailPage: React.FC = () => {
    const { id } = useParams();
    const [isProMode, proModeToggle] = useToggle([false, true] as const);
    const [stockInfo, setStockInfo] = useState<StockInfo>({
        name: '삼성전자',
        price: 134900,
        percent: 12.9,
    });
    const stockDispatch = useStockDetailDispatch();

    const { ref, width } = useElementSize();

    useEffect(() => {
        stockDispatch(setPrice(135500));
    }, []);

    useEffect(() => {
        stockDispatch(setPrice(135500));
    }, []);

    return (
        <Stack px={72} pt={34}>
            <Group align="start" justify="space-between">
                <StockTitle name={stockInfo.name} price={stockInfo.price} percent={stockInfo.percent} />
                <Switch
                    color="primary.5"
                    labelPosition="left"
                    label="Pro Mode"
                    checked={isProMode}
                    onChange={() => proModeToggle()}
                />
            </Group>
            <Grid justify="space-between" px={0} columns={32}>
                <Grid.Col span={22} style={{ height: '130vh' }}>
                    <Stack>
                        <StockChart />
                        <StockNav />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={10} ref={ref}>
                    <StickyTrading width={width} />
                </Grid.Col>
            </Grid>
        </Stack>
    );
};

export default StockDetailPage;
