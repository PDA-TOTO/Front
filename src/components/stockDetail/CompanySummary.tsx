import { Group, Spoiler, Stack, Text, Title } from '@mantine/core';

const CompanySummary: React.FC = () => {
    const hashtags = ['제조업', '코스피'];
    const mockSummary = `
    SK 산하의 종합 반도체 제조회사(IDM). 반도체 업계의 호황기와 경쟁자의 해체, 집중적 투자로 인한 경쟁력 강화와 점유율 상승 등의 효과로 SK그룹 계열사 중 3대 
    축이자 그 중에서도 가장 높은 매출액과 영업이익, 시가총액을 유지하고 있다. 실제 20세기만 해도 대기업 순
    위 최상위권이라고 보긴 어렵던 SK가 21세기 들어 점점 최상위권으로 발돋움하는데 가장 큰 역할을 했다고 볼 수 있다.2\n
    022년 기준 DRAM 업계 2위[4], 낸드 3위[5]의 점유율을 기록하며 메모리 반도체 전체 기준으로 삼성전자에 이어서 두 번째로 높
    은 점유율을 기록하고 있다.[6] 한국에서는 삼성전자가 독점하다시피 한 상황에서 의외일 수 있는데, SK하이닉스의 매출이 높은 이유 중
     하나는 중국 시장에서 1위이기 때문이다. 애플과 중국의 스마트폰 제조업체가 주요 고객사이다. MacBook이나 iMac 등 애플 제품의 경우 뒤
     판을 열면 SK하이닉스 스티커 또는 각인이 있는 메모리 모듈을 볼 수 있다.그 외에도 CMOS 업계 점유율 3% 남짓으로 6위 사업자이며 파운드리 영역에
     도 진출했다.노동조합은 전임직이한국노총금속노련, 기술사무직과 전문직은 민주노총 화섬산업노조이다.`;

    return (
        <Stack mt="xl" gap="xl" mb={60}>
            <Group>
                {hashtags.map((h) => (
                    <Text>{`#${h}`}</Text>
                ))}
            </Group>
            <Stack gap={0}>
                <Title order={2}>기업소개</Title>
                <Spoiler
                    maxHeight={120}
                    showLabel="더 보기"
                    hideLabel="닫기"
                    styles={{
                        control: {
                            color: 'gray',
                        },
                    }}
                >
                    {mockSummary}
                </Spoiler>
            </Stack>
        </Stack>
    );
};

export default CompanySummary;
