import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core';
import { ReactElement, useState } from 'react';
import MainStockTradingBody from './MainStockTradingBody';
import StockTradingBody from './StockTradingBody';
import { IconChevronLeft } from '@tabler/icons-react';

type StickyTradingProps = {
    width: number;
};

enum TradingPageType {
    BASE,
    BUY,
    SELL,
}

const StickyTrading: React.FC<StickyTradingProps> = ({ width }: StickyTradingProps) => {
    const stackGap = 'xl';
    const [tradingPage, setTradingPage] = useState<TradingPageType>(TradingPageType.BASE);

    const getBackTitle = (title: string): ReactElement => {
        return (
            <Group gap={0} style={{ transform: 'translateX(-0.5rem)' }}>
                <ActionIcon
                    variant="transparent"
                    color="primary.5"
                    onClick={() => setTradingPage(TradingPageType.BASE)}
                >
                    <IconChevronLeft strokeWidth={1.5} />
                </ActionIcon>
                <Text size="lg">{title}</Text>
            </Group>
        );
    };

    const renderCurrentHeader = (pageType: TradingPageType) => {
        switch (pageType) {
            case TradingPageType.BUY:
                return getBackTitle('사기');
            case TradingPageType.SELL:
                return getBackTitle('팔기');
            default:
                return <Text size="lg">주식현황</Text>;
        }
    };

    const renderCurrentPage = (pageType: TradingPageType) => {
        switch (pageType) {
            case TradingPageType.BUY:
                return <StockTradingBody gap={stackGap} tradingType="BUY" />;
            case TradingPageType.SELL:
                return <StockTradingBody gap={stackGap} tradingType="CELL" />;
            default:
                return (
                    <MainStockTradingBody
                        gap={stackGap}
                        onBuyClick={() => setTradingPage(TradingPageType.BUY)}
                        onSellClick={() => setTradingPage(TradingPageType.SELL)}
                    />
                );
        }
    };
    return (
        <Paper shadow="xl" radius="lg" w={width} bg="block.5" style={{ position: 'sticky', top: 20 }} p={20}>
            <Stack gap={stackGap}>
                {renderCurrentHeader(tradingPage)}
                {renderCurrentPage(tradingPage)}
            </Stack>
        </Paper>
    );
};

export default StickyTrading;
