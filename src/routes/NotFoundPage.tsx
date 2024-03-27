import { Container, Image, Stack, Text, Title } from '@mantine/core';
import img from '../assets/img/notfound/notfound.svg';

const NotFoundPage: React.FC = () => {
    return (
        <Container h="100vh" w="100%">
            <Stack justify="center" align="center" h="100vh">
                <div style={{ position: 'relative' }}>
                    <Title>404 Not Found</Title>
                    <Image
                        src={img}
                        h={100}
                        w="auto"
                        fit="contain"
                        style={{ position: 'absolute', top: '-60px', left: '220px' }}
                    />
                </div>

                <Text>해당 페이지는 없는 주소의 페이지입니다 🥲</Text>
            </Stack>
        </Container>
    );
};

export default NotFoundPage;
