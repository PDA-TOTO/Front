import { AreaChart, getFilteredChartTooltipPayload } from '@mantine/charts';
import { Paper, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
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

type StockChartProps = {
    stockData: any[];
};

const StockChart: React.FC<StockChartProps> = ({ stockData }: StockChartProps) => {
    const [chart, setChart] = useState<any[]>([]);

    useEffect(() => {
        const tmp = stockData.map((stock) => {
            return {
                date: stock.price_date.toString().substr(0, 10).replaceAll('-', '/'),
                price: stock.price_ePr,
            };
        });

        setChart(tmp.reverse());
    }, [stockData]);

    return (
        <Stack>
            <AreaChart
                h={320}
                curveType="linear"
                data={chart}
                tooltipAnimationDuration={700}
                dataKey="date"
                unit="₩"
                yAxisProps={{ width: 80, domain: ([_, dataMax], allowDataOverflow) => [0, dataMax * 1.5] }}
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
