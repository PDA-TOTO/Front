import { Button, Container, Tabs, VisuallyHidden } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import StockCounter from './StockCounter';
import BidAskPriceInfo from './BidAskPriceInfo';
import { useState } from 'react';

const StockPriceInfobox: React.FC = () => {
    const [count, handlers] = useCounter(1, { min: 0 });
    const [activeTab, setActiveTab] = useState<string | null>('counter');
    const [price, setPrice] = useState<number>(134900);

    return (
        <Container w="100%" bg="white.5" style={{ borderRadius: 8, boxShadow: 'var(--mantine-shadow-lg)' }} px={0}>
            <Tabs value={activeTab} onChange={setActiveTab} color="primary.5">
                <Tabs.List grow>
                    <Tabs.Tab value="counter">주문</Tabs.Tab>
                    <Tabs.Tab value="bidAskPrice">호가</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="counter">
                    <StockCounter count={count} handlers={handlers} price={price} setPrice={setPrice} />
                </Tabs.Panel>
                <Tabs.Panel value="bidAskPrice">
                    <BidAskPriceInfo
                        onPriceClick={(price) => {
                            setActiveTab('counter');
                            setPrice(price);
                        }}
                    />
                </Tabs.Panel>
            </Tabs>
            <VisuallyHidden>
                <Button onClick={() => alert(price)}>테스트</Button>
            </VisuallyHidden>
        </Container>
    );
};

export default StockPriceInfobox;
