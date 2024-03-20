import { Container, Stack, Text } from '@mantine/core';

type CircleInfoProps = {
    title: string;
    info: string;
    width: number;
};

const CircleInfo: React.FC<CircleInfoProps> = ({ title, info, width }: CircleInfoProps) => {
    return (
        <Stack align="center" gap="xs">
            <Container
                style={{
                    width: `${width}px`,
                    height: `${width}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '8px solid gray',
                    borderRadius: '50%',
                }}
            >
                <Text size="lg" fw="bolder">
                    {info}
                </Text>
            </Container>
            <Text size="sm">{title}</Text>
        </Stack>
    );
};

export default CircleInfo;
