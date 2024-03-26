import { Divider, Group, HoverCard, Stack, Text, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FinanceResponse, GlobalResponse, getFinance } from '../../lib/apis/stock';

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

const getPercentageGroup = (sec1: string, price: number | string = 'N/A', percentage: number | string = 'N/A') => {
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
            {typeof percentage === 'string' ? (
                <Text size="xs" ta="right" fw="bolder" c="gray.5">
                    N/A
                </Text>
            ) : (
                <Group justify="flex-end" align="center">
                    <Text size="xs" ta="right" fw="bolder" c="gray.5" mr={1}>
                        작년대비
                    </Text>
                    {percentage < 0 ? (
                        <Text size="xs" fw="bolder" c="blue.5" inherit>
                            {`${percentage.toFixed(2).toLocaleString()}% 감소`}{' '}
                        </Text>
                    ) : (
                        <Text size="xs" fw="bolder" c="red.5" inherit>
                            {`${percentage.toFixed(2).toLocaleString()}% 증가`}{' '}
                        </Text>
                    )}
                </Group>
            )}
        </Stack>
    );
};

const getBeta = (num?: number) => {
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
            {num ? (
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
            ) : (
                <Text>N/A</Text>
            )}
        </Stack>
    );
};

type StockFinanceProps = {
    id: string;
};

const toStr = (num: number = 0, unit?: string) => {
    if (num === 0) return 'N/A';
    let txt = `${num.toLocaleString()}`;
    if (unit) txt += ` ${unit}`;
    return txt;
};

const toMoney = (num: number = 0) => {
    if (num === 0) return 'N/A';

    if (num >= 1000000000000) {
        return `${(num / 1000000000000).toFixed(2).toLocaleString()} 조`;
    }

    return `${(num / 100000000).toFixed(2).toLocaleString()} 억`;
};

const StockFinance: React.FC<StockFinanceProps> = ({ id }: StockFinanceProps) => {
    const [finance, setFinance] = useState<FinanceResponse | null>(null);

    const fetchFinance = async () => {
        const data: GlobalResponse<FinanceResponse> = await getFinance(id);
        if (data.result) {
            setFinance(data.result);
        }
    };

    useEffect(() => {
        fetchFinance();
    }, []);

    return (
        <>
            <Text py="md" ta="right">{`최근 업데이트: ${'24/03/02'}`}</Text>
            <Group grow pb={40}>
                <MainStack height="600px">
                    <DefaultBox bg="secondary" grow={3}>
                        {getDefaultGroup('영업 이익률', toStr(finance?.incomeRate, '%'))}
                        {getDefaultGroup('순이익률', toStr(finance?.netincomeRate, '%'))}
                        {getDefaultGroup('ROE', toStr(finance?.roeVal, '%'))}
                    </DefaultBox>
                    <DefaultBox bg="primary" grow={7}>
                        {getBigGroup('EPS', toStr(finance?.eps))}
                        {getBigGroup('PER', toStr(finance?.per))}
                        {getBigGroup('BPS', toStr(finance?.bps))}
                        {getBigGroup('PBR', toStr(finance?.pbr))}
                    </DefaultBox>
                </MainStack>
                <MainStack height="600px">
                    <DefaultBox bg="primary" grow={6}>
                        {getProfitGroup('시가총액', toMoney(finance?.cap))}
                        {getPercentageGroup('매출액', finance?.rev, finance?.revGrownthRate)}
                        {getPercentageGroup('영업이익', finance?.income, finance?.incomeGrownthRate)}
                        {getPercentageGroup('당기순이익', finance?.netincome, finance?.netincomeGrownthRate)}
                    </DefaultBox>
                    <DefaultBox bg="secondary" grow={4}>
                        {getDefaultGroup('배당률', toStr(finance?.dividendRate, '%'))}
                        {getDefaultGroup('배당금', toStr(finance?.dividend, '원'))}
                    </DefaultBox>
                </MainStack>
                <MainStack height="600px">
                    <DefaultBox bg="secondary" grow={1}>
                        {getDefaultGroup('부채비율', toStr(finance?.lbltRate, '%'))}
                        {getDefaultGroup('당좌비율', toStr(finance?.quickRatio, '%'))}
                    </DefaultBox>
                    <DefaultBox bg="primary" grow={1}>
                        {getProfitGroup('Consensus', toStr(finance?.consensus, '원'))}
                        {getBeta(finance?.beta)}
                    </DefaultBox>
                </MainStack>
            </Group>
        </>
    );
};

export default StockFinance;
