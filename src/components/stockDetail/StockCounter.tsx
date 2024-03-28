import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import classes from './css/StockCounterInput.module.css';
import { useEffect, useState } from 'react';
import { useElementSize } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useStockDetailDispatch, useStockDetailSelector } from '../../lib/hooks/stockReduxHooks';
import { decrementQuantity, incrementQuantity, setPrice, setQuantity } from '../../store/reducers/stockControlReducers';

const StockCounter: React.FC = () => {
    const stockControl = useStockDetailSelector((state) => state.stockControl);
    const [strPrice, setStrPrice] = useState<string>('');
    const { ref, width } = useElementSize();
    const stockDetailDispatch = useStockDetailDispatch();

    useEffect(() => {
        setStrPrice(stockControl.price ? stockControl.price.toLocaleString() : '0');
    }, [stockControl.price]);

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
                            setStrPrice(stockControl.price!.toLocaleString());
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
                            setStrPrice(stockControl.price!.toLocaleString());
                            return;
                        }
                        stockDetailDispatch(setPrice(p));
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
                        if (stockControl.quantity > 1) {
                            stockDetailDispatch(decrementQuantity());
                        }
                    }}
                >
                    <IconMinus />
                </ActionIcon>
                <input
                    className={classes.stockCounterInput}
                    type="number"
                    value={stockControl.quantity}
                    min={0}
                    onChange={(e) => {
                        stockDetailDispatch(setQuantity(Number(e.target.value)));
                    }}
                    onBlur={(e) => {
                        if (stockControl.quantity === 0) {
                            stockDetailDispatch(setQuantity(1));
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
                <ActionIcon
                    variant="transparent"
                    color="primary.5"
                    onClick={() => stockDetailDispatch(incrementQuantity())}
                >
                    <IconPlus />
                </ActionIcon>
            </Group>
        </Stack>
    );
};

export default StockCounter;
