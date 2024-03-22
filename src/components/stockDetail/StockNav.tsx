import { Tabs, Text } from "@mantine/core";
import StockCommunity from "./community/StockCommunity";
import StockNews from "./news/StockNews";
import { useParams } from "react-router-dom";
import LockInfo from "./common/LockInfo";
import LockResearch from "../../assets/img/stock/lock/LockResearch.png";
import LockNews from "../../assets/img/stock/lock/LockNews.png";
import LockCommunity from "../../assets/img/stock/lock/LockCommunity.png";
import LockInformation from "../../assets/img/stock/lock/LockInformation.png";

const StockNav: React.FC = () => {
  const { id } = useParams();
  const tabs = [
    {
      value: "summary",
      name: "개요",
    },
    {
      value: "community",
      name: "커뮤니티",
    },
    {
      value: "info",
      name: "정보",
    },
    {
      value: "news",
      name: "뉴스",
    },
    {
      value: "research",
      name: "리서치",
    },
  ];

  return (
    <Tabs color="primary.5" defaultValue="summary" style={{ zIndex: 5 }}>
      <Tabs.List grow justify="space-between">
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            <Text size="md" fw="bolder">
              {tab.name}
            </Text>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.Panel value="summary">fadfafd</Tabs.Panel>
      <Tabs.Panel value="community">
        {id && <StockCommunity id={id} />}
      </Tabs.Panel>
      <Tabs.Panel value="info">fadfafd</Tabs.Panel>
      <Tabs.Panel value="news">{id && <StockNews id={id} />}</Tabs.Panel>
      <Tabs.Panel value="research">
        <LockInfo
          tabName={"리서치"}
          btnName1="커뮤니티"
          btnName2="퀴즈"
          imgLink={LockInformation}
        />
      </Tabs.Panel>
    </Tabs>
  );
};

export default StockNav;
