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

const getDefaultGroup = (sec1: string, sec2: string, desc: string) => {
    return (
        <Group justify="space-between">
            <HoverCard width={400}>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        {sec1}
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">{desc}</Text>
                </HoverCard.Dropdown>
            </HoverCard>
            <Text size="lg" fw="bolder">
                {sec2}
            </Text>
        </Group>
    );
};

const getBigGroup = (sec1: string, sec2: string, description: string) => {
    return (
        <Group align="flex-start" justify="space-between">
            <HoverCard width={400}>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        {sec1}
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">{description}</Text>
                </HoverCard.Dropdown>
            </HoverCard>
            <Text size={rem(32)} fw="bolder">
                {sec2}
            </Text>
        </Group>
    );
};

const getProfitGroup = (sec1: string, price: string, description: string) => {
    return (
        <Stack gap={0}>
            <HoverCard width={340}>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        {sec1}
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">{description}</Text>
                </HoverCard.Dropdown>
            </HoverCard>

            <Text size={rem(40)} fw="bolder">
                {price}
            </Text>
        </Stack>
    );
};

const getPercentageGroup = (
    sec1: string,
    price: number | string = 'N/A',
    percentage: number | string = 'N/A',
    desc: string
) => {
    return (
        <Stack gap={0}>
            <Group justify="space-between">
                <HoverCard width={350}>
                    <HoverCard.Target>
                        <Text size="lg" fw="bolder">
                            {sec1}
                        </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="md">{desc}</Text>
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
            <HoverCard width={340}>
                <HoverCard.Target>
                    <Text size="lg" fw="bolder">
                        Beta
                    </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <Text size="md">
                        주식의 시장 변동성에 대한 민감도를 측정하는 지표입니다. 베타가 1보다 높으면 시장보다 변동성이
                        크고, 1보다 낮으면 시장보다 변동성이 작다는 것을 의미합니다.
                    </Text>
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
                        {getDefaultGroup(
                            '영업 이익률',
                            toStr(finance?.incomeRate, '%'),
                            '기업의 핵심 사업에서 얼마나 효율적으로 이익을 창출하는지를 보여주는 지표입니다. 매출액 대비 영업이익의 비율로 계산되며, 수익성 분석에 중요한 역할을 합니다'
                        )}
                        {getDefaultGroup(
                            '순이익률',
                            toStr(finance?.netincomeRate, '%'),
                            '기업의 최종적인 수익성을 나타내는 지표입니다. 매출액 대비 순이익의 비율로 계산됩니다'
                        )}
                        {getDefaultGroup(
                            'ROE',
                            toStr(finance?.roeVal, '%'),
                            '자기자본이익률이라고도 하며, 기업이 자기자본(주주지분)을 활용하여 얼마나 이익을 냈는지를 나타내는 지표입니다. \nROE = (당기순이익 / 자본총계) x 100'
                        )}
                    </DefaultBox>
                    <DefaultBox bg="primary" grow={7}>
                        {getBigGroup(
                            'EPS',
                            toStr(finance?.eps),
                            '주당순이익이라고도 하며, 기업이 1주당 얼마나 이익을 냈는지를 나타내는 지표입니다. 당기순이익을 유통주식수로 나누어 계산됩니다. EPS = (당기순이익 / 유통주식수)'
                        )}
                        {getBigGroup(
                            'PER',
                            toStr(finance?.per),
                            '주가수익비율이라고도 하며, 주가가 주당순이익의 몇 배인가를 나타내는 지표입니다. 주가를 주당순이익으로 나누어 계산됩니다. PER = 주가 / 주당순이익(EPS)'
                        )}
                        {getBigGroup(
                            'BPS',
                            toStr(finance?.bps),
                            '주당순자산가치라고도 하며, 기업의 자산을 모두 청산했을 때 주주들에게 돌아갈 금액을 나타내는 지표입니다. 총자산에서 총부채를 뺀 순자산을 발행주식수로 나누어 계산됩니다. BPS = (총자산 - 총부채) / 발행주식수'
                        )}
                        {getBigGroup(
                            'PBR',
                            toStr(finance?.pbr),
                            '주가순자산비율이라고 하며, 주가가 순자산 대비 얼마나 비싼지를 나타내는 지표입니다. 주가를 주당순자산으로 나누어 계산됩니다. PBR = 주가 / 주당순자산(BPS)'
                        )}
                    </DefaultBox>
                </MainStack>
                <MainStack height="600px">
                    <DefaultBox bg="primary" grow={6}>
                        {getProfitGroup(
                            '시가총액',
                            toMoney(finance?.cap),
                            '상장기업의 총 발행주식의 가치를 의미합니다. 기업의 규모를 나타내는 지표로 가장 많이 사용됩니다. 시가총액 = 주가 x 발행주식수'
                        )}
                        {getPercentageGroup(
                            '매출액',
                            finance?.rev,
                            finance?.revGrownthRate,
                            '기업이 특정 기간 동안 상품이나 서비스를 판매하여 얻은 금액입니다. 기업의 주요 수익원이며, 기업의 성장성과 수익성을 평가하는 중요한 지표입니다. 매출액 = 판매량 x 판매가격'
                        )}
                        {getPercentageGroup(
                            '영업이익',
                            finance?.income,
                            finance?.incomeGrownthRate,
                            '기업의 주된 영업활동을 통해 발생한 이익을 의미합니다. 매출액에서 매출원가, 판매비, 일반관리비를 차감하여 계산됩니다. 영업이익 = 매출액 - (매출원가 + 판매비 + 일반관리비)'
                        )}
                        {getPercentageGroup(
                            '당기순이익',
                            finance?.netincome,
                            finance?.netincomeGrownthRate,
                            '기업이 일정 기간 동안 (보통 1년) 모든 영업 활동과 비영업 활동을 포함하여 얻은 최종 이익을 의미합니다. 매출에서 모든 비용과 세금을 차감하여 계산됩니다. 당기 순이익 = 영업이익 + 영업외수익 - 영업외비 - 법인세'
                        )}
                    </DefaultBox>
                    <DefaultBox bg="secondary" grow={4}>
                        {getDefaultGroup(
                            '배당률',
                            toStr(finance?.dividendRate, '%'),
                            '주식 1주당 배당금액을 주당 시가로 나눈 비율로, 주주들이 투자한 주식에 대해 얼마나 이익을 얻을 수 있는지를 나타내는 지표입니다. \n배당률 = (주당 배당금액 / 주당 시가) x 100'
                        )}
                        {getDefaultGroup(
                            '배당금',
                            toStr(finance?.dividend, '원'),
                            '배당금은 기업이 이익의 일부를 주주들에게 나누어 주는 금액입니다.'
                        )}
                    </DefaultBox>
                </MainStack>
                <MainStack height="600px">
                    <DefaultBox bg="secondary" grow={1}>
                        {getDefaultGroup(
                            '부채비율',
                            toStr(finance?.lbltRate, '%'),
                            '기업의 부채 수준을 나타내는 지표입니다. 부채를 자본으로 나눈 비율로 계산되며, 기업의 재무 안정성을 평가하는 데 중요한 역할을 합니다. 부채 비율 = (부채 / 자본) x 100'
                        )}
                        {getDefaultGroup(
                            '당좌비율',
                            toStr(finance?.quickRatio, '%'),
                            '당좌비율은 기업의 단기 유동성을 측정하는 지표입니다. 단기 부채를 얼마나 빠르게 상환할 수 있는지를 나타냅니다. 당좌비율 = (당좌자산 / 유동부채) x 100'
                        )}
                    </DefaultBox>
                    <DefaultBox bg="primary" grow={1}>
                        {getProfitGroup(
                            'Consensus',
                            toStr(finance?.consensus, '원'),
                            '증권사 분석가들의 평균적인 투자 의견을 의미합니다. 일반적으로 목표 주가와 추천 등급으로 나타냅니다.'
                        )}
                        {getBeta(finance?.beta)}
                    </DefaultBox>
                </MainStack>
            </Group>
        </>
    );
};

export default StockFinance;
