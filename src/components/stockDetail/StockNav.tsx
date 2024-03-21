import { Tabs, Text } from "@mantine/core";
import StockCommunity from "./community/StockCommunity";
import { useParams } from "react-router-dom";

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
    <Tabs color="primary.5" defaultValue="summary">
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
      <Tabs.Panel value="news">fadfafd</Tabs.Panel>
      <Tabs.Panel value="research">fadfafd</Tabs.Panel>
    </Tabs>
  );
};

export default StockNav;
