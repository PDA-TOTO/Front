import { Button, Grid, Group, Stack, rem } from '@mantine/core';
import CircleInfo from './CircleInfo';
import { useElementSize } from '@mantine/hooks';
import { MouseEventHandler, useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
type MainStockTradingBodyProps = {
    gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    onBuyClick: MouseEventHandler;
    onSellClick: MouseEventHandler;
    num: string;
    avg: number;
    trust: string;
};

const MainStockTradingBody: React.FC<MainStockTradingBodyProps> = ({
    gap,
    onBuyClick,
    onSellClick,
    num,
    avg,
    trust,
}: MainStockTradingBodyProps) => {
    const { ref, width } = useElementSize();
    const [active, setActive] = useState<boolean>(true);
    const handleActive = () => {
        notifications.show({
            message: '주식 장이 마감되었어요. 내일 다시 시도해보세요!',
            color: 'red.5',
        });
    };

    useEffect(() => {
        let today = new Date();
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes(); // 분
        let seconds = today.getSeconds(); // 초
        let milliseconds = today.getMilliseconds(); // 밀리초
        console.log(hours + ':' + minutes + ':' + seconds + ':' + milliseconds);
        if (9 <= hours && hours <= 16) {
            setActive(true);
        } else {
            setActive(true);
        }

        // const stockCode = location.pathname.split("/").pop();
        // console.log(stockCode);
        // stockCode &&
        //   getMyStockInfo(stockCode).then((response) => {
        //     console.log(response.data.result);
        //     setInfo(response.data.result);
        //   });
    }, []);

    return (
        <Stack gap={gap}>
            <CircleInfo title="신뢰도" info={trust} width={width / 2 - 14} />
            <Group justify="space-between">
                <CircleInfo title="보유 수량" info={String(num)} width={width / 2 - 14} />
                <CircleInfo title="평단" info={Number(avg).toLocaleString()} width={width / 2 - 14} />
            </Group>
            <Grid ref={ref}>
                <Grid.Col span={6}>
                    <Button
                        color="pink.5"
                        autoContrast
                        fullWidth
                        h={rem(54)}
                        onClick={active ? onBuyClick : handleActive}
                    >
                        사기
                    </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Button
                        color="secondary.5"
                        autoContrast
                        fullWidth
                        h={rem(54)}
                        onClick={active ? onSellClick : handleActive}
                    >
                        팔기
                    </Button>
                </Grid.Col>
            </Grid>
        </Stack>
    );
};

export default MainStockTradingBody;
