<<<<<<< HEAD
import { Tabs, Text } from '@mantine/core';
import StockCommunity from './community/StockCommunity';
import StockNews from './news/StockNews';
import { useParams } from 'react-router-dom';
import LockInfo from './common/LockInfo';
import LockResearch from '../../assets/img/stock/lock/LockResearch.png';
// import LockNews from '../../assets/img/stock/lock/LockNews.png';
// import LockCommunity from '../../assets/img/stock/lock/LockCommunity.png';
// import LockInformation from '../../assets/img/stock/lock/LockInformation.png';
import CompanySummary from './CompanySummary';
import StockFinance from './StockFinance';
=======
import { Tabs, Text } from "@mantine/core";
import StockCommunity from "./community/StockCommunity";
import StockNews from "./news/StockNews";
import { useParams } from "react-router-dom";
import LockInfo from "./common/LockInfo";
import LockResearch from "../../assets/img/stock/lock/LockResearch.png";
import LockNews from "../../assets/img/stock/lock/LockNews.png";
// import LockCommunity from "../../assets/img/stock/lock/LockCommunity.png";
import LockInformation from "../../assets/img/stock/lock/LockInformation.png";
import CompanySummary from "./CompanySummary";
import StockFinance from "./StockFinance";

import { useEffect, useState } from "react";
import { getMyInfo } from "../../lib/apis/user";
>>>>>>> 2302ab355ef6a9f32d7fe3890b611fba30b6fb96

const StockNav: React.FC = () => {
  const [experience, setExperience] = useState<number>(0);
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

<<<<<<< HEAD
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
            <Tabs.Panel value="summary">{id && <CompanySummary id={id}/>}</Tabs.Panel>
            <Tabs.Panel value="community">{id && <StockCommunity id={id} />}</Tabs.Panel>
            <Tabs.Panel value="info">{id && <StockFinance id={id} />}</Tabs.Panel>
            <Tabs.Panel value="news">{id && <StockNews id={id} />}</Tabs.Panel>
            <Tabs.Panel value="research">
                <LockInfo tabName={'리서치'} imgLink={LockResearch} />
            </Tabs.Panel>
        </Tabs>
    );
=======
  useEffect(() => {
    getMyInfo().then((data) => {
      setExperience(data.data.result?.experience);
    });
  }, []);

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
      <Tabs.Panel value="summary">
        {id && <CompanySummary id={id} />}
      </Tabs.Panel>
      <Tabs.Panel value="community">
        {id && <StockCommunity id={id} />}
      </Tabs.Panel>
      <Tabs.Panel value="info">
        {experience >= 400 ? (
          id && <StockFinance id={id} />
        ) : (
          <LockInfo tabName={"정보"} imgLink={LockInformation} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="news">
        {experience >= 100 ? (
          id && <StockNews id={id} />
        ) : (
          <LockInfo tabName={"뉴스"} imgLink={LockNews} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="research">
        <LockInfo tabName={"리서치"} imgLink={LockResearch} />
      </Tabs.Panel>
    </Tabs>
  );
>>>>>>> 2302ab355ef6a9f32d7fe3890b611fba30b6fb96
};

export default StockNav;
