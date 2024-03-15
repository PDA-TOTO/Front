import { Grid } from '@mantine/core';
import StickyTrading from '../../components/stockDetail/StickyTrading';

const StockDetailPage: React.FC = () => {
    return (
        <Grid grow justify="space-between" px={{ base: 72 }} pt={34}>
            <Grid.Col span={8} bg="primary" style={{ height: '130vh' }}>
                1
            </Grid.Col>
            <Grid.Col span={4}>
                <StickyTrading />
            </Grid.Col>
        </Grid>
    );
};

export default StockDetailPage;
