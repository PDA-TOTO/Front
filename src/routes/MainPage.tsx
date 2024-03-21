import { Button, Flex, Overlay, Text,Stack, Grid, Group, Image } from '@mantine/core'
import classes from '../styles/MainPage.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CircleInfo from '../components/stockDetail/CircleInfo';
import VoteBar from '../components/stockDetail/VoteBar';
import ThumbsUpColor from "../assets/img/stock/community/ThumbsUpColor.svg"
import ThumbsDownColor from "../assets/img/stock/community/ThumbsDownColor.svg";

export default function MainPage() {
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const commetDummy = [
    {
      id: 1,
      userName: "email",
      text: "오를 것 같아요! TOTO 짱",
      likeAmount: 3,
      isLiked: true,
      time: 25,
      vote: true,
    },
    {
      id: 2,
      userName: "email",
      text: "내릴 것 같아요",
      likeAmount: 3,
      isLiked: true,
      time: 25,
      vote: false,
    },
  ];



  useEffect(()=>{
    if(location.state){
      setModal(location.state.signup)
    }
  },[])





  return (
    <Flex direction='column' className={classes.mainPage}>

      {
        modal&&
          <>
          <Overlay fixed className={classes.overlay} display="flex">
          
            <Flex className={classes.modal} w="450px" h="300px" direction="column" bg="block.5" align="center" justify="center" gap="20px">
              <Text size='22px' fw="600" >회원가입이 완료되었습니다.</Text>
              <Text size='14px' fw="600">계좌가 개설되었습니다.</Text>
              <Flex  direction="column" gap="5px">
                  <Flex gap="10px">
                    <Text size='18px' fw="600">계좌</Text>
                    <Text size='18px' fw="600">|</Text>
                    <Text size='18px' fw="600">110-222-3311333</Text>
                  </Flex> 
                  <Flex gap="10px">
                    <Text size='18px' fw="600">자산</Text>
                    <Text size='18px' fw="600">|</Text>
                    <Text size='18px' fw="600">₩ 10,000,000</Text>
                  </Flex>
              </Flex>
              <Button w="300px" color="primary.5" onClick={()=>{setModal(false); navigate('/quiztest')}}>
                LEVEL 평가하러 가기
              </Button>
            </Flex>

          </Overlay>
          </>
      }

      <Flex className={classes.page} direction='column' justify='center' align='center'>
        <Text color='primary.5' size='52px' className={classes.firstText}>
          {/* <div className={classes.redText}><div className={classes.point}></div>투</div>데이 <div className={classes.blueText}><div className={classes.point}></div>투</div>자는 */}
        </Text>
        <Text size='52px' className={classes.secondText}>
          {/* <div className={classes.to}><div className={classes.point2}></div>TO</div><div className={classes.to}><div className={classes.point2}></div>TO</div> 에서 */}
        </Text>
        <div className={classes.firstPageColor}></div>
      </Flex>
      <Flex mih="100vh" align={"center"} direction="column">
        <Text size= "36px" fw="600"  p="80px">주린이부터 프로까지</Text>
        <Flex direction="column"  gap="120px">
          <Flex align={"center"} justify={"center"} gap="100px">
            <Stack className={classes.background} gap={10} p="20px">
                  <Text fw="bolder" size="20px">주식현황</Text>
                  <CircleInfo title="신뢰도" info="A+" width={150} />
                  <Group justify="space-between">
                      <CircleInfo title="평균가" info="240,000" width={150} />
                      <CircleInfo title="수량" info="5" width={150} />
                  </Group>
                  <Grid >
                      <Grid.Col span={6}>
                          <Text className={classes.stockinfo_btn} bg="pink.5"  lh={"50px"} ta="center" fw="bolder">
                              사기
                          </Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                          <Text  className={classes.stockinfo_btn}bg="secondary.5"  lh={"50px"} ta="center" fw="bolder">
                              팔기
                          </Text>
                      </Grid.Col>
                  </Grid>
              </Stack>
              <Text fw="bolder" size="20px">간단한 화면으로 어려운 주식을 쉽게</Text>
          </Flex>
          <Flex direction={"column"} justify={"center"} align={"center"}>
              <Flex direction={"column"} py={"40px"} w="100%" justify={"center"} align={"center"}>
                <Text size="20px" fw="bolder" lh="40px">커뮤니티를 통한 투표와 토론</Text>
              </Flex>
              <Flex className={classes.background} direction={"column"} justify={"center"} align={"center"} mb={"150px"} p="20px">
                <Text fw={"bolder"} size="28px" my="50px">TOTO 다시 오를까?</Text>
                <VoteBar leftAmount={120} rightAmount={190} />
                <hr style={{margin: "30px" ,height:"1px" ,border:"0px", background:"var(--mantine-color-gray-2)", width: "100%"}}/>
                <Flex direction={"column"} gap={20} w="100%" px="100px" py="10px">
                  {commetDummy.map((value) => {
                    return (
                      <Flex key={value.id} gap="10px">
                        {value.vote ? (
                            <Image src={ThumbsUpColor} height={"40px"}/>
                        ) : (
                            <Image src={ThumbsDownColor} height={"40px"}/>
                        )}
                        <Text lh="40px" size="20px" fw={"bolder"}>{value.text}</Text>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>

            </Flex>
        </Flex>
        </Flex>

      <Flex direction="column" h="400px" w="100%" bg={"primary.5"} justify={"center"} align={"center"} gap="60px">
          <Text color="white.5" fw="bolder" size="32px"><span style={{fontFamily:"Itim", letterSpacing:"-0.2em", fontWeight:"normal", fontSize:"40px"}}>TOTO</span> 와 함께 오늘의 투자를 시작하세요.</Text>
          <Flex gap="32px">
            <Button color="secondary.5" c="primary.5" size="20px" w="250px" h="50px" onClick={()=>{navigate("/stocks")}}>주식 투자하기</Button>
            <Button color="pink.5" c="primary.5" size="20px" w="250px" h="50px" onClick={()=>{navigate("/portfolio")}}>포트폴리오 보러 가기</Button>
            <Button color="secondary.5" c="primary.5" size="20px" w="250px" h="50px" onClick={()=>{navigate("/quiz",{state:{solve:false}})}}>퀴즈 풀기</Button>
          </Flex>
      </Flex>
    </Flex>
  )
}
