import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import classes from './css/StockCounterInput.module.css';
import { useEffect, useState } from 'react';
import { useElementSize } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

type StockCounterProps = {
    count: number;
    handlers: {
        increment: () => void;
        decrement: () => void;
        set: (value: number) => void;
        reset: () => void;
    };
    price: number;
    setPrice: (price: number) => void;
};

const StockCounter: React.FC<StockCounterProps> = ({ count, handlers, price, setPrice }: StockCounterProps) => {
    const [strPrice, setStrPrice] = useState<string>(price.toLocaleString());
    const { ref, width } = useElementSize();

    useEffect(() => {
        setStrPrice(price.toLocaleString());
    }, [price]);

    return (
        <Stack align="center" py="xl">
            <Text ref={ref} size="1.6rem" fw="bolder" opacity={0} style={{ position: 'absolute', top: 20 }}>
                {/*  크기를 알기 위해서*/}
                {strPrice}
            </Text>
            <Group justify="center">
                <input
                    type="text"
                    className={classes.stockPriceInput}
                    value={strPrice}
                    style={{ width: width + 10 }}
                    onChange={(e) => setStrPrice(e.target.value)}
                    onKeyUp={() => {
                        let p = Number(strPrice.replaceAll(',', '').trim());
                        if (isNaN(p)) {
                            setStrPrice(price.toLocaleString());
                        } else {
                            setStrPrice(p.toLocaleString());
                        }
                    }}
                    onBlur={() => {
                        // FIXME: 조건식 및 메시지 고쳐야함
                        const p = Number(strPrice.replaceAll(',', '').trim());
                        if (p > 1000000 || p < 100) {
                            notifications.show({
                                title: 'Warning',
                                message: '주식 체결가는 ~만 가능합니다. 🥲',
                                autoClose: 3000,
                                radius: 'md',
                                color: 'red.5',
                            });
                            setStrPrice(price.toLocaleString());
                            return;
                        }
                        setPrice(p);
                    }}
                />
                <Text size="xxl" fw="bolder">
                    원
                </Text>
            </Group>
            <Group align="center" justify="center">
                <ActionIcon
                    variant="transparent"
                    color="primary.5"
                    onClick={() => {
                        if (count > 1) {
                            handlers.decrement();
                        }
                    }}
                >
                    <IconMinus />
                </ActionIcon>
                <input
                    className={classes.stockCounterInput}
                    type="number"
                    value={count}
                    min={0}
                    onChange={(e) => {
                        handlers.set(Number(e.target.value));
                    }}
                    onBlur={(e) => {
                        if (count === 0) {
                            handlers.set(1);
                            notifications.show({
                                title: 'Warning',
                                message: '체결 수량은 1이상 이어야 합니다. 🥲',
                                autoClose: 3000,
                                radius: 'md',
                                color: 'red.5',
                            });
                        } else {
                            e.target.value = e.target.value.replace(/(^0+)/, '');
                        }
                    }}
                />
                <ActionIcon variant="transparent" color="primary.5" onClick={handlers.increment}>
                    <IconPlus />
                </ActionIcon>
            </Group>
        </Stack>
    );
};

export default StockCounter;
