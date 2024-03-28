import { AreaChart, getFilteredChartTooltipPayload } from '@mantine/charts';
import { Paper, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const mockStockData = [
    {
        date: '2023/12/11',
        price: 130000,
    },
    {
        date: '2023/12/12',
        price: 128000,
    },
    {
        date: '2023/12/13',
        price: 132000,
    },
    {
        date: '2023/12/14',
        price: 142000,
    },
    {
        date: '2023/12/15',
        price: 132000,
    },
    {
        date: '2023/12/16',
        price: 112000,
    },
    {
        date: '2023/12/17',
        price: 132020,
    },
    {
        date: '2023/12/18',
        price: 132000,
    },
    {
        date: '2023/12/19',
        price: 132000,
    },
    {
        date: '2023/12/20',
        price: 132000,
    },
    {
        date: '2023/12/21',
        price: 132000,
    },
    {
        date: '2023/12/22',
        price: 172000,
    },
    {
        date: '2023/12/23',
        price: 132000,
    },
    {
        date: '2023/12/24',
        price: 132000,
    },
    {
        date: '2023/12/27',
        price: 232000,
    },
    {
        date: '2023/12/28',
        price: 132800,
    },
    {
        date: '2023/12/29',
        price: 142900,
    },
];

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" shadow="md" radius="md" bg="primary.5">
            <Text c="white.5" fw={500} mb={5}>
                {label}
            </Text>
            {getFilteredChartTooltipPayload(payload).map((item: any) => (
                <Text c="white.5" key={item.name} fz="sm">
                    주가 : {item.value.toLocaleString()} ₩
                </Text>
            ))}
        </Paper>
    );
}

const StockChart: React.FC = () => {
    const [stockData, setStockData] = useState(mockStockData);

    useEffect(() => {
        const id = setInterval(() => {
            stockData[stockData.length - 1].price += 10000;

            let tmp = stockData.slice();
            setStockData(tmp);
        }, 1000);

        if (stockData[stockData.length - 1].price > 300000) {
            clearInterval(id);
        }

        return () => clearInterval(id);
    }, [stockData]);

    // 차트 이외의 버튼 들이 존재할 수 있음
    return (
        <Stack>
            <AreaChart
                h={320}
                curveType="linear"
                data={stockData}
                tooltipAnimationDuration={700}
                dataKey="date"
                unit="₩"
                yAxisProps={{ width: 80 }}
                xAxisProps={{
                    padding: { right: 30 },
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    cursor: true,
                }}
                dotProps={{ r: 0 }}
                activeDotProps={{ r: 2, fill: 'primary.5' }}
                valueFormatter={(value) => value.toLocaleString()}
                series={[{ name: 'price', color: 'primary.5' }]}
            />
        </Stack>
    );
};

export default StockChart;
