import { useEffect, useState } from "react";
import {
  Tabs,
  Flex,
  Text,
  Progress,
  Button,
  Image,
  Grid,
  ScrollArea,
} from "@mantine/core";
import classes from "../../styles/user/MyPage.module.css";
import money from "../../assets/img/my/money.png";
import portfolio from "../../assets/img/my/portfolio.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/reduxHooks";
import { getStockTransaction } from "../../lib/apis/stocks";
import { Portfolio, Transaction } from "../../lib/type";
import { getMyInfo } from "../../lib/apis/user";
import { userGetinfo } from "../../store/reducers/user";

export default function MyPage() {
  const [tab, setTab] = useState("마이페이지");
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [portfolios, setPortfolios] = useState<Array<Portfolio>>([]);
  const dispatch = useAppDispatch();

  const numLevel =
    user.user.experience < 100
      ? 1
      : user.user.experience < 400
      ? 2
      : user.user.experience < 800
      ? 3
      : 4;

  const level = ["", "Bronze", "Silver", "Gold", "Platinum", ""];
  const color = [
    "",
    "var(--mantine-color-blue-7)",
    "var(--mantine-color-gray-5)",
    "var(--mantine-color-red-7)",
    "var(--mantine-color-blue-4)",
    "",
  ];

  const tendency = (): string => {
    if (user.user.tendency === 1) return "안전형";
    else if (user.user.tendency === 2) return "안정추구형";
    else if (user.user.tendency === 3) return "위험중립형";
    else if (user.user.tendency === 4) return "적극투자형";
    else return "공격투자형";
  };

  const lists = portfolios.map((value, index) => {
    return (
      <Grid.Col key={index} span={4} w="100%">
        <Flex justify={"center"}>
          <Text size="18px" fw="600">
            {value.portName}
          </Text>
        </Flex>
      </Grid.Col>
    );
  });

  const content =
    transactions.length > 0 && lastPage >= 1 ? (
      transactions.map((value, index) => {
        return (
          <Flex key={index} direction="column" w="100%" gap="10px">
            <Flex justify="space-between" p="10px" align="flex-end" w="100%">
              {value.portfolio.deletedAt ? (
                <Text size="24px" fw="600" lh="20px" c="gray.4" w="300px">
                  삭제된 포트폴리오
                </Text>
              ) : (
                <Text size="24px" fw="600" lh="20px" w="300px">
                  {value.portfolio.portName}
                </Text>
              )}
              <Text size="24px" fw="600">
                {value.code.name}
              </Text>
              <Text size="16px" fw="600" c="gray.5">
                {value.createdAt.toString().replace("T", " ").replace("Z", " ")}
              </Text>
              {value.transactionType === "BUY" ? (
                <Text size="24px" fw="600" c="red.5" px="30px" ta="end">
                  매수
                </Text>
              ) : (
                <Text size="24px" fw="600" c="blue.5" px="30px" ta="end">
                  매도
                </Text>
              )}
              <Flex gap="20px" align="flex-end">
                <Text size="24px" fw="600">
                  금액가
                </Text>
                <Text size="24px" fw="600">
                  |
                </Text>
                <Flex gap="10px">
                  <Text size="24px" fw="600" c="gray.5">
                    {value.price}
                  </Text>
                  <Text size="24px" fw="600" c="gray.5">
                    *
                  </Text>
                  <Text size="24px" fw="600" c="gray.5">
                    {value.amount}
                  </Text>
                  <Text size="24px" fw="600" c="gray.5">
                    =
                  </Text>
                  <Text size="24px" fw="600">
                    {value.price * value.amount}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <hr
              style={{
                height: "2px",
                width: "100%",
                background: "var(--mantine-color-gray-1)",
                border: 0,
              }}
            />
          </Flex>
        );
      })
    ) : (
      <Flex
        w="100%"
        h="100%"
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap="50px"
      >
        <Text fw="bolder" size="32px" c="gray.3">
          거래 내역이 없습니다.
        </Text>
        <Button
          color="primary.5"
          size="20px"
          w="300px"
          h="50px"
          onClick={() => {
            navigate("/stocks");
          }}
        >
          지금 모의 투자를 시작하세요!
        </Button>
      </Flex>
    );

  useEffect(() => {
    getStockTransaction(page, 6).then((data) => {
      setTransactions(data.data.result.data);
      setLastPage(data.data.result?.lastPage);
    });
    getMyInfo().then((data) => {
      setPortfolios(data.data.result?.portfolios);
    });
    dispatch(userGetinfo());
  }, [page]);

  return (
    <>
      <Flex direction="column" p="40px" gap="40px">
        <Tabs defaultValue="first" variant="pills" color="primary.5" pl="40px">
          <Tabs.List>
            <Tabs.Tab
              value="first"
              fz={"18px"}
              w="150px"
              h="50px"
              fw="600"
              onClick={() => {
                setTab("마이페이지");
              }}
            >
              마이페이지
            </Tabs.Tab>
            <Tabs.Tab
              value="second"
              fz={"18px"}
              w="150px"
              h="50px"
              fw="600"
              onClick={() => {
                setTab("거래 내역");
              }}
            >
              거래 내역
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {tab === "마이페이지" ? (
          <Flex direction="column" mih="75vh" pl="40px" pr="40px" gap="40px">
            <Flex
              className={classes.profile_Card}
              direction="column"
              bg="primary.5"
              w="100%"
              h="180px"
              p="20px"
              gap="15px"
              justify="space-between"
            >
              <Text c="white.5" size="22px" fw="600" w="100%" ta="center">
                {user.user.email}
              </Text>
              <Flex gap="10px" align="center" justify="center">
                {user.user.tendency && (
                  <Text c="white.5" size="22px" fw="bolder" ta="center">
                    {tendency()}
                  </Text>
                )}
                <Button
                  color="white.5"
                  c="primary.5"
                  h="30px"
                  size="20px"
                  fw="600"
                  onClick={() => {
                    navigate("/tendencytest");
                  }}
                >
                  투자 성향 테스트 하기
                </Button>
              </Flex>
              <Flex direction="column" gap="5px">
                <Flex w="100%" justify="space-between">
                  <Text size="18px" fw="600" c={`${color[numLevel]}`}>
                    {level[numLevel]}
                  </Text>
                  <Text size="18px" fw="600" c={`${color[numLevel + 1]}`}>
                    {level[numLevel + 1]}
                  </Text>
                </Flex>
                <Progress
                  color="blue.5"
                  bg="white.5"
                  value={
                    user.user.experience < 100
                      ? user.user.experience
                      : user.user.experience < 400
                      ? (user.user.experience - 100) / 3
                      : user.user.experience < 800
                      ? (user.user.experience - 400) / 4
                      : (user.user.experience - 800) / 10
                  }
                  animated
                  size={"12px"}
                />
              </Flex>
            </Flex>
            <Flex
              bg="block.5"
              justify="center"
              align={"center"}
              className={classes.info}
              p="40px"
              h="350px"
              gap="100px"
            >
              <Flex direction="column" gap="30px" align={"center"}>
                <Flex
                  direction={"column"}
                  justify={"center"}
                  align={"center"}
                  w="100%"
                >
                  <Image src={money} w="100px" />
                  <Text size="22px" fw="600">
                    계좌
                  </Text>
                </Flex>
                <Flex direction={"column"} gap="10px">
                  <Flex gap="10px">
                    <Text size="22px" fw="600" w="100px">
                      계좌 번호
                    </Text>
                    <Text size="22px" fw="600">
                      |
                    </Text>
                    <Text size="22px" fw="600">
                      {user.user.account.account}
                    </Text>
                  </Flex>
                  <Flex gap="10px">
                    <Text size="22px" fw="600" w="100px">
                      잔액
                    </Text>
                    <Text size="22px" fw="600">
                      |
                    </Text>
                    <Text size="22px" fw="600">
                      {" "}
                      {`₩ ${user.user.account.amount.toLocaleString()}원`}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex w="50%" direction={"column"}>
                <Flex
                  direction={"column"}
                  justify={"center"}
                  align={"center"}
                  w="100%"
                >
                  <Image src={portfolio} w="100px" />
                  <Text size="22px" fw="600">
                    포트폴리오
                  </Text>
                </Flex>
                <ScrollArea mt="30px" h="70px">
                  <Grid m="10px">{lists}</Grid>
                </ScrollArea>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Flex direction="column" mih="75vh" pl="40px" pr="40px" gap="40px">
            <Text size="24px" fw="600">
              거래 내역
            </Text>
            <Flex
              direction={"column"}
              bg="block.5"
              align="center"
              className={classes.info}
              px="40px"
              py="20px"
              miw="fit-content"
              h="60vh"
            >
              {content}
            </Flex>
            <Flex gap="50px" w="100%" justify="center">
              {page > 1 && (
                <Button
                  color="primary.5"
                  onClick={() => {
                    setPage((state) => state - 1);
                  }}
                >
                  {"<"}
                </Button>
              )}
              {page < lastPage && (
                <Button
                  color="primary.5"
                  onClick={() => {
                    setPage((state) => state + 1);
                  }}
                >
                  {">"}
                </Button>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}
