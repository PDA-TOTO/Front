import { Button, Grid, Group, Stack, rem } from '@mantine/core';
import CircleInfo from './CircleInfo';
import { useElementSize } from '@mantine/hooks';

type CurrentStockTradingProps = {
    gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    onBuyClick: (e: MouseEvent) => void;
};

const CurrentStockTrading: React.FC<CurrentStockTradingProps> = ({ gap, onBuyClick }: CurrentStockTradingProps) => {
    const { ref, width } = useElementSize();
    return (
        <Stack gap={gap}>
            <CircleInfo title="신뢰도" info="A+" width={width / 2 - 14} />
            <Group justify="space-between">
                <CircleInfo title="신뢰도" info="A+" width={width / 2 - 14} />
                <CircleInfo title="신뢰도" info="A+" width={width / 2 - 14} />
            </Group>
            <Grid ref={ref}>
                <Grid.Col span={6}>
                    <Button color="pink.5" autoContrast fullWidth h={rem(54)}>
                        사기
                    </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Button color="secondary.5" autoContrast fullWidth h={rem(54)}>
                        팔기
                    </Button>
                </Grid.Col>
            </Grid>
        </Stack>
    );
};

export default CurrentStockTrading;
