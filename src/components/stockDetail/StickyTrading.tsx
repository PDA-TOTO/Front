import { Container } from '@mantine/core';

const StickyTrading: React.FC = () => {
    return (
        <Container p={0} style={{ border: '1px solid black', height: '200px', position: 'fixed' }}>
            <div>하이하이</div>
        </Container>
    );
};

export default StickyTrading;
