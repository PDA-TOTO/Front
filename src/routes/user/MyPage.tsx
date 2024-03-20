import React,{useState} from 'react'
import { Tabs, Flex, Text, Progress } from '@mantine/core'
import classes from "../../styles/user/MyPage.module.css";

export default function MyPage() {
    const [tab,setTab] = useState('마이페이지');

    
return (
    <Flex direction="column" p="40px" gap="40px">
        <Tabs defaultValue="first" variant='pills' color="primary.5">
            <Tabs.List>
            <Tabs.Tab value="first" fz={"18px"} w="150px" h="50px" fw="600" onClick={()=>{setTab("마이페이지")}}>마이페이지</Tabs.Tab>
            <Tabs.Tab value="second" fz={"18px"} w="150px" h="50px" fw="600"  onClick={()=>{setTab("거래 내역")}}>거래 내역</Tabs.Tab>
            </Tabs.List>
        </Tabs>
        <Flex bg="block.5"  mih="75vh">
            <Flex className={classes.profile_Card} direction="column" bg="primary.9" w="300px" h="150px" p="10px" gap="15px">
                    <Text c="white.5" size="22px" fw="600">hello@naver.com</Text>
                    <Flex direction="column" gap="5px">
                        <Text c="white.5" size="18px" fw="600">Silver</Text>
=                       <Progress color="blue.5" bg="white.5" value={70} animated/>
                    </Flex>
            </Flex>
        </Flex>
    </Flex>
    );
}
