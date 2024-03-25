import { Divider, Group, HoverCard, Stack, Text, rem } from '@mantine/core';

type DefaultBoxPrps = {
    bg: 'primary' | 'secondary';
    children: React.ReactNode;
    py?: string | number;
    grow: number;
};

const DefaultBox: React.FC<DefaultBoxPrps> = ({ py, bg, children, grow }) => {
    return (
        <Stack
            bg={bg === 'primary' ? 'primary.5' : 'secondary.5'}
            p="lg"
            py={py}
            c={bg === 'primary' ? 'white.5' : 'primary.5'}
            style={{ borderRadius: 8, flexGrow: grow, flexShrink: 1 }}
            w="100%"
            justify="space-between"
        >
            {children}
        </Stack>
    );
};

type MainStackProps = {
    height: string;
    children: React.ReactNode;
};

const MainStack: React.FC<MainStackProps> = ({ height, children }: MainStackProps) => {
    return <div style={{ display: 'flex', flexDirection: 'column', height: height, gap: 18 }}>{children}</div>;
};

const getDefaultGroup = (sec1: string, sec2: string) => {
    return (
        <Group justify="space-between">
            <HoverCard>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        {sec1}
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">per은 뭐 어쩌구 저쩌구</Text>
                </HoverCard.Dropdown>
            </HoverCard>
            <Text size="lg" fw="bolder">
                {sec2}
            </Text>
        </Group>
    );
};

const getBigGroup = (sec1: string, sec2: string) => {
    return (
        <Group align="flex-start" justify="space-between">
            <HoverCard>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        {sec1}
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">per은 뭐 어쩌구 저쩌구</Text>
                </HoverCard.Dropdown>
            </HoverCard>
            <Text size={rem(32)} fw="bolder">
                {sec2}
            </Text>
        </Group>
    );
};

const getProfitGroup = (sec1: string, price: string) => {
    return (
        <Stack gap={0}>
            <HoverCard>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        {sec1}
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">per은 뭐 어쩌구 저쩌구</Text>
                </HoverCard.Dropdown>
            </HoverCard>

            <Text size={rem(40)} fw="bolder">
                {price}
            </Text>
        </Stack>
    );
};

const getPercentageGroup = (sec1: string, price: number, percentage: number) => {
    return (
        <Stack gap={0}>
            <Group justify="space-between">
                <HoverCard>
                    <HoverCard.Target>
                        <Text size="lg" fw="bolder">
                            {sec1}
                        </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="md">per은 뭐 어쩌구 저쩌구</Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <Text size="lg" fw="bolder">
                    {price.toLocaleString()}
                </Text>
            </Group>
            <Group justify="flex-end" align="center">
                <Text size="xs" ta="right" fw="bolder" c="gray.5" mr={1}>
                    작년대비
                </Text>
                {percentage < 0 ? (
                    <Text size="xs" fw="bolder" c="blue.5" inherit>
                        {`${percentage.toLocaleString()}% 감소`}{' '}
                    </Text>
                ) : (
                    <Text size="xs" fw="bolder" c="red.5" inherit>
                        {`${percentage.toLocaleString()}% 증가`}{' '}
                    </Text>
                )}
            </Group>
        </Stack>
    );
};

const getBeta = (num: number) => {
    return (
        <Stack py={50}>
            <HoverCard>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        Beta
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">per은 뭐 어쩌구 저쩌구</Text>
                </HoverCard.Dropdown>
            </HoverCard>
            <Stack gap={0}>
                {num < 0 ? (
                    <>
                        <Divider variant="dashed" />
                        <span
                            style={{
                                width: '120px',
                                background: '#C9D6DE',
                                height: rem(-20 * num),
                                margin: '0 auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <p style={{ color: '#1E1F22', fontWeight: 'bolder' }}>{num}</p>
                        </span>
                    </>
                ) : (
                    <>
                        <span
                            style={{
                                width: '120px',
                                background: '#DEC9C9',
                                height: rem(20 * num),
                                margin: '0 auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <p style={{ color: '#1E1F22', fontWeight: 'bolder' }}>{num}</p>
                        </span>
                        <Divider variant="dashed" />
                    </>
                )}
            </Stack>
        </Stack>
    );
};

type StockFinanceProps = {
    id: string;
};

const StockFinance: React.FC<StockFinanceProps> = ({ id }: StockFinanceProps) => {
    return (
        <>
            <Text py="md" ta="right">{`최근 업데이트: ${'24/03/02'}`}</Text>
            <Group grow pb={40}>
                <MainStack height="600px">
                    <DefaultBox bg="secondary" grow={3}>
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('순이익률', '19.8%')}
                        {getDefaultGroup('ROE', '19.8%')}
                    </DefaultBox>
                    <DefaultBox bg="primary" grow={7}>
                        {getBigGroup('EPS', '13,190')}
                        {getBigGroup('PER', '24.49')}
                        {getBigGroup('PBS', '90,394')}
                        {getBigGroup('PBR', '1.82')}
                    </DefaultBox>
                </MainStack>
                <MainStack height="600px">
                    <DefaultBox bg="primary" grow={6}>
                        {getProfitGroup('시가총액', '121.29 조')}
                        {getPercentageGroup('매출액', 319004, -20)}
                        {getPercentageGroup('영업이익', 319004, -20)}
                        {getPercentageGroup('당기순이익', 319004, -20)}
                    </DefaultBox>
                    <DefaultBox bg="secondary" grow={4}>
                        {getDefaultGroup('배당률', '19.8%')}
                        {getDefaultGroup('배당금', '2800원')}
                    </DefaultBox>
                </MainStack>
                <MainStack height="600px">
                    <DefaultBox bg="secondary" grow={1}>
                        {getDefaultGroup('부채비율', '39.92')}
                        {getDefaultGroup('당좌비율', '196.75')}
                        {getDefaultGroup('유보율', '33,143.62')}
                    </DefaultBox>
                    <DefaultBox bg="primary" grow={1}>
                        {getProfitGroup('Consensus', '19,000 원')}
                        {getBeta(-3.4)}
                    </DefaultBox>
                </MainStack>
            </Group>
        </>
    );
};

export default StockFinance;
