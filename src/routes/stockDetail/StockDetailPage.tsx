import { Grid, Group, Stack, Switch } from '@mantine/core';
import StickyTrading from '../../components/stockDetail/StickyTrading';
import { useNavigate, useParams } from 'react-router-dom';
import StockTitle from '../../components/stockDetail/StockTitle';
import { useEffect, useState } from 'react';
import { useElementSize, useToggle } from '@mantine/hooks';
import StockNav from '../../components/stockDetail/StockNav';
import StockChart from '../../components/stockDetail/StockChart';
import { useStockDetailDispatch } from '../../lib/hooks/stockReduxHooks';
import { setPrice } from '../../store/reducers/stockControlReducers';
import { getStockInfo } from '../../lib/apis/stock';

type StockInfo = {
    price: number;
    percent: number;
};

const StockDetailPage: React.FC = () => {
    const { id } = useParams();
    const [isProMode, proModeToggle] = useToggle([false, true] as const);
    const [stockName, setStockName] = useState<string>('');
    const [chart, setChart] = useState([]);
    const navigate = useNavigate();
    const [stockInfo, setStockInfo] = useState<StockInfo>({
        price: 134900,
        percent: 12.9,
    });

    const { ref, width } = useElementSize();

    const fetchStockBasicInfo = async () => {
        try {
            const data = await getStockInfo(id!, '3m', 'DAY');
            console.log(data.result.chart);
            setStockName(data.result.name);
            setChart(data.result.chart);
        } catch (_) {
            navigate('/not-found');
        }
    };

    useEffect(() => {
        fetchStockBasicInfo();
    }, []);

    return (
        <Stack px={72} pt={34}>
            <Group align="start" justify="space-between">
                <StockTitle name={stockName} price={stockInfo.price} percent={stockInfo.percent} />
                <Switch
                    color="primary.5"
                    labelPosition="left"
                    label="Pro Mode"
                    checked={isProMode}
                    onChange={() => proModeToggle()}
                />
            </Group>
            <Grid justify="space-between" px={0} columns={32}>
                <Grid.Col span={22}>
                    <Stack>
                        <StockChart stockData={chart} />
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
