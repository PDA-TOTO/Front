import { Paper, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import CurrentStockTrading from './CurrentStockTrading';

type StickyTradingProps = {
    width: number;
};

enum TradingPageType {
    BASE,
    BUY,
    SELL,
}

const StickyTrading: React.FC<StickyTradingProps> = ({ width }: StickyTradingProps) => {
    const [tradingPage, setTradingPage] = useState<TradingPageType>(TradingPageType.BASE);

    const renderCurrentHeader = (pageType: TradingPageType) => {
        switch (pageType) {
            case TradingPageType.BUY:
                return <Text>사기</Text>;
            case TradingPageType.SELL:
                return <Text>팔기</Text>;
            default:
                return <Text size="lg">주식현황</Text>;
        }
    };

    const renderCurrentPage = (pageType: TradingPageType) => {
        switch (pageType) {
            case TradingPageType.BUY:
                return '사기';
            case TradingPageType.SELL:
                return '팔기';
            default:
                return <CurrentStockTrading gap="xl" onBuyClick={() => {}} />;
        }
    };
    return (
        <Paper shadow="xl" radius="lg" w={width} bg="white" style={{ position: 'sticky', top: 20 }} p={20}>
            <Stack gap="xl">
                {renderCurrentHeader(tradingPage)}
                {renderCurrentPage(tradingPage)}
            </Stack>
        </Paper>
    );
};

export default StickyTrading;
