import { Button, Flex, Overlay, Text,Stack, Grid, Group, Image } from '@mantine/core'
import classes from '../styles/MainPage.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CircleInfo from '../components/stockDetail/CircleInfo';
import VoteBar from '../components/stockDetail/VoteBar';
import ThumbsUpColor from "../assets/img/stock/community/ThumbsUpColor.svg"
import ThumbsDownColor from "../assets/img/stock/community/ThumbsDownColor.svg";
import lock from "../assets/img/stock/lock/lock.svg";
import { useAppSelector } from '../lib/hooks/reduxHooks';

export default function MainPage() {
  const [modal, setModal] = useState(false);
  const user = useAppSelector(state=>state.user.user.account)
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
                    <Text size='18px' fw="600">{user.account}</Text>
                  </Flex> 
                  <Flex gap="10px">
                    <Text size='18px' fw="600">자산</Text>
                    <Text size='18px' fw="600">|</Text>
                    <Text size='18px' fw="600">₩ {user.amount.toLocaleString()} 원</Text>
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
        <Flex direction="column"  >
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
              <Text fw="bolder" size="24px">간단한 화면으로 어려운 주식을 쉽게</Text>
          </Flex>
          <Flex className={classes.page} justify={"center"} align={"center"} direction={"column"} gap="100px">
            <Flex
                direction={"column"}
                justify="center"
                align="center"
                h="300px"
                w= "750px"
                pos="relative"
                className={classes.background}
              >
              <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
              >
                <Flex
                  direction={"row"}
                  justify="center"
                  align="center"
                >
                  <Image src={lock} />
                  <Text fw="bolder" lh="30px" size="20px">아직 리서치 탭을 이용하실 수 없어요.</Text>
                </Flex>
                <Flex
                  direction={"column"}
                  align="center"
                  p="30px"
                >
                  <Text fw="bolder">
                    투투는 여러분들이 해당 서비스가 왜 필요한지 느꼈으면 좋겠어요
                  </Text>
                  <Text fw="bolder">아래의 활동을 통해서 투자 지식을 늘리고 해금할 수 있어요!</Text>
                </Flex>
          <Flex gap="32px">
            <Text fw="bolder" bg="secondary.5" w="100px" h="50px" lh="50px" ta="center" c="primary.5" className={classes.border}>커뮤니티</Text>
            <Text fw="bolder"  bg="primary.5" w="100px" h="50px" lh="50px" ta="center" c="white.5" className={classes.border}>퀴즈</Text>
          </Flex>
          <Flex pos={"absolute"} direction="column" top="0px" h="300px" w= "750px" p="20px" gap="30px" className={`${classes.blur}  ${classes.border}`} justify="center" align={"center"}>
            <Text fw="bolder" c="gray.2">
              주식(株式, 영어: share, stock)이란 기본적으로 주식회사의 자본을 구성하는 단위이며, 
              사원인 주주가 주식회사에 출자한 일정한 지분 또는 이를 나타내는 증권을 말한다. 
            </Text>
            <Text fw="bolder" c="gray.2">
              주식회사의 지분인 주식과 인적 회사의 지분은 모두 사원의 지위를 의미한다는 점에서는 같으나, 
              주식은 지분이 균등한 비율적 단위로 세분화되고 1인이 복수의 지분을 갖는다는 점에서
              유한회사의 지분과 같고, 각 사원이 1개의 지분을 갖고 다만 그 지분의 양이 각 사원의 출자액에 따라 다른 인적회사의 지분의 경우와 다르다. 
              논리적으로 볼 때 인적회사는 사원이 선행하고 이들의 출자액이 정해지고 그에 따라 지분이 정해지는 순으로 전개되나, 
              주식회사에서는 자본이 정해지고 특정인이 주식을 인수함으로써 사원이 되는 순서로 전개된다.
            </Text>
          </Flex>
        </Flex>
        </Flex>
            <Text fw="bolder" size="24px" >등급에 맞는 정보로 주식을 향해 차근차근</Text>
        </Flex>
        <Flex direction={"column"} justify={"center"} align={"center"}>
            <Flex direction={"column"} py={"40px"} w="100%" justify={"center"} align={"center"}>
              <Text size="24px" fw="bolder" lh="40px">커뮤니티를 통한 투표와 토론</Text>
            </Flex>
            <Flex className={classes.background} direction={"column"} justify={"center"} align={"center"} p="20px">
              <Text fw={"bolder"} size="28px" my="50px">TOTO 다시 오를까?</Text>
              <VoteBar leftAmount={300} rightAmount={100} />
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
      <Flex className={classes.page} justify="center" align="center" gap="200px">
        <Text fw="bolder" size="24px">주식 프로로 가는 퀴즈 풀이</Text>
        <Flex className={classes.background} direction="column" bg="block.5" h="400px" w="400px" justify="center" align="center" p="40px" gap="80px">
          <Flex direction="column" gap="12px">
            <Text fw="bolder" size="24px" lh="24px">1</Text>
            <Text fw="bolder" size="18px" lh="24px">상장사 주가에 발행주식 수를 곱하면 구할 수 있는 값으로, 전체 주식의 가치를 시장가격으로 평가한 금액인 이것은? </Text>
          </Flex> 
            <Grid w="100%">
              <Grid.Col span={6}>
                <Flex gap="10px">
                  <div className={classes.option}>
                        <div className={classes.answerBorder}></div>
                        <div className={classes.answerText}>1</div>
                  </div>
                  <Text fw="bolder" lh="20px">시가총액</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex gap="10px">
                  <div className={classes.option}>
                        <div className={classes.optionBorder}></div>
                        <div className={classes.optionText}>2</div>
                  </div>
                  <Text fw="bolder" lh="20px">액면가</Text>
                </Flex>
              </Grid.Col>                    <Grid.Col span={6}>
                <Flex gap="10px">
                  <div className={classes.option}>
                        <div className={classes.optionBorder}></div>
                        <div className={classes.optionText}>3</div>
                  </div>
                  <Text fw="bolder" lh="20px">PBR</Text>
                </Flex>
              </Grid.Col>                    <Grid.Col span={6}>
                <Flex gap="10px">
                  <div className={classes.option}>
                        <div className={classes.optionBorder}></div>
                        <div className={classes.optionText}>4</div>
                  </div>
                  <Text fw="bolder" lh="20px">PER</Text>
                </Flex>
              </Grid.Col>
            </Grid>
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
