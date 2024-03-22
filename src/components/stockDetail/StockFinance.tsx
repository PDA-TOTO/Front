import { Container, Group, Stack, Text } from '@mantine/core';

type DefaultBoxPrps = {
    bg: 'primary' | 'secondary';
    children: React.ReactNode;
};
const DefaultBox: React.FC<DefaultBoxPrps> = ({ bg, children }) => {
    return (
        <Container
            bg={bg === 'primary' ? 'primary.5' : 'secondary.5'}
            p="sm"
            fluid
            c={bg === 'primary' ? 'white.5' : 'primary.5'}
            style={{ borderRadius: 8 }}
            w="100%"
        >
            {children}
        </Container>
    );
};

type StockFinanceProps = {
    id: string;
};

const StockFinance: React.FC<StockFinanceProps> = ({ id }: StockFinanceProps) => {
    const getDefaultGroup = (sec1: string, sec2: string) => {
        return (
            <Group justify="space-between">
                <Text>{sec1}</Text>
                <Text>{sec2}</Text>
            </Group>
        );
    };

    return (
        <>
            <Text py="md" ta="right">{`최근 업데이트: ${'24/03/02'}`}</Text>
            <Group grow>
                <Stack>
                    <DefaultBox bg="primary">
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                    </DefaultBox>
                    <DefaultBox bg="secondary">
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                    </DefaultBox>
                </Stack>
                <Stack>
                    <DefaultBox bg="primary">
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                    </DefaultBox>
                    <DefaultBox bg="secondary">
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                    </DefaultBox>
                </Stack>
                <Stack>
                    <DefaultBox bg="primary">
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                    </DefaultBox>
                    <DefaultBox bg="secondary">
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                        {getDefaultGroup('영업 이익률', '19.8%')}
                    </DefaultBox>
                </Stack>
            </Group>
        </>
    );
};

export default StockFinance;
