import { Stack, Text } from '@mantine/core';

type StockTitleProps = {
    name: string;
    price: number;
    percent: number;
};

const StockTitle: React.FC<StockTitleProps> = ({ name, price, percent }: StockTitleProps) => {
    return (
        <Stack m={0} gap={0}>
            <Text size="lg">{name}</Text>
            <Text size="xxl" fw="bolder">{`${price.toLocaleString()} 원`}</Text>
            <Text c={percent < 0 ? 'blue' : 'red'}>{`${percent < 0 ? '-' : '+'}${percent} %`}</Text>
        </Stack>
    );
};

export default StockTitle;
