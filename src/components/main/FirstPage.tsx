import {
  Button,
  Container,
  Grid,
  Group,
  Image,
  Space,
  Text,
  Title,
  rem,
} from "@mantine/core";
import searchingSvg from "../../assets/img/main/2.Searching.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../lib/hooks/reduxHooks";

const FirstPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.isUser);

  return (
    <Container h={"100vh"} w={"100%"} pt={240} ps={120}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          duration: 1.2,
        }}
      >
        <Grid justify="center">
          <Grid.Col span={7}>
            <Title size={rem(62)}>투데이 투자는</Title>
            <Title size={rem(62)}>투투에서!</Title>
            <Space h="md" />
            <Text>
              투투는 투자를 어려워하는 주린이들에게 투자를 쉽게 알려주는
              플랫폼입니다. 모의투자와 퀴즈, 커뮤니티를 통해서 투자실력을
              올려보세요!
            </Text>
            <Space h="xl" />
            <Group>
              {!user && (
                <Button
                  variant="outline"
                  size="xl"
                  color="primary.5"
                  radius="lg"
                  onClick={() => navigate("/signup")}
                >
                  회원가입
                </Button>
              )}
              <Button
                size="xl"
                color="primary.5"
                radius="lg"
                onClick={() => navigate("/stocks")}
              >
                주식 바로가기
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={5}>
            <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
            >
              <Image
                h={520}
                src={searchingSvg}
                style={{ transform: `translateY(-100px)` }}
              />
            </motion.div>
          </Grid.Col>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default FirstPage;
