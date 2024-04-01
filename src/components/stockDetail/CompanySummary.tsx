import { Spoiler, Stack, Title } from '@mantine/core';
import { stockInfo } from '../../lib/apis/stock';
import { useEffect, useState } from 'react';
type Props = { id: string };

type infoType = {
    id: number;
    krxCode: string;
    INFO: string;
};
const CompanySummary = ({ id }: Props) => {
    const [info, setInfo] = useState<infoType[]>([]);
    useEffect(() => {
        stockInfo(id).then((response) => {
            console.log(response.data);
            setInfo(response.data);
        });
    }, []);

    return (
        <Stack mt="xl" gap="xl" mb={60}>
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
                    {info.map((value) => {
                        return value.INFO;
                    })}
                    {/* {mockSummary} */}
                </Spoiler>
            </Stack>
        </Stack>
    );
};

export default CompanySummary;
