import { Button, Flex , Text, Image, Overlay, ScrollArea, Badge, Progress} from "@mantine/core"
import { useNavigate, useLocation } from "react-router-dom"
import test from "../../assets/img/quiz/quiz.png";
import { useEffect, useState } from "react";
import questionMark from "../../assets/img/quiz/questionMark.png";
import classes from "../../styles/quiz/QuizMain.module.css"
import { useAppDispatch, useAppSelector } from "../../lib/hooks/reduxHooks";
import { setLevelTest, setStockTest } from "../../store/reducers/quiz";

export type Quiz = {
  id: number,
  question: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  level: number,
  answer: number,
}


export default function QuizMainPage() {
    const navigate = useNavigate();
    const [solve, setSolve] = useState(false);
    const [modal, setModal] = useState(false);
    const quizs = useAppSelector(state => state.quiz.quiz);
    const user = useAppSelector(state => state.user);
    const [progress,setProgress] = useState(
        (user.user.experience < 100 ? 0
        : (user.user.experience < 400 ? 100
        : (user.user.experience < 800 ? 400
        : 800)))
    );
    const dispatch = useAppDispatch();
    const location = useLocation();

    const numLevel = (user.user.experience < 100 ? 1
      : (user.user.experience < 400 ? 2 
      : (user.user.experience < 800 ? 3
      : 4)))
    
    const level = ["","Bronze","Silver","Gold","Platinum",""];
    const color = ["","var(--mantine-color-blue-7)","var(--mantine-color-gray-7)","var(--mantine-color-red-7)","var(--mantine-color-blue-4)",""]

    const question = location.state.solve && quizs.map((value,index)=>{
      return(
      <Flex key={index} direction="column" justify="center" align="center" pt="40px" >
        <Flex direction="column" w="400px" gap="15px" mb="20px">
          <Flex align="center" gap="10px">
            <Text size="18px" fw="600" >{index+1}.</Text>
            {value.answer === location.state.choiceList[index]+1 ?
              <Badge color="blue.3" c="primary.5" size="lg" fw="600">정답</Badge>
              :
              <Badge color="red.3" c="primary.5" size="lg" fw="600">오답</Badge>
            }
          </Flex>
          <Text size="18px" lh="20px" fw="600">{value.question}</Text>
        </Flex>
        <Flex direction="column" gap="10px">
            {[value.option1,value.option2,value.option3,value.option4].map((v,idx)=>{
              if(idx === location.state.choiceList[index]){
                return(
                    <Flex key={idx} gap="10px" w="400px" pl="15px">
                      <div className={classes.option} onClick={()=>{}}>
                          {idx+1 === value.answer &&<div className={classes.correct}></div>}
                          <div className={classes.answerBorder}></div>
                          <div className={classes.answerText}>{idx+1}</div>
                      </div>
                      {idx+1 === value.answer ?
                      <Text fw="600" c="primary.5">{v}</Text>
                      :<Text fw="600" c="gray.4">{v}</Text>
                      }
                    </Flex>
                )
                }else{
                  return(
                    <Flex key={idx}  gap="10px" w="400px" pl="15px">
                      <div className={classes.option} onClick={()=>{}}>
                        {idx+1 === value.answer &&<div className={classes.correct}></div>}
                        <div className={classes.optionBorder}></div>
                        <div className={classes.optionText}>{idx+1}</div>
                      </div>
                      {idx+1 === value.answer ?
                      <Text fw="600" c="primary.5">{v}</Text>
                      :<Text fw="600" c="gray.4">{v}</Text>
                      }
                    </Flex>
                  )
                }
              }
            )}

        </Flex>
        <hr className={classes.line} />
      </Flex>
      )
    })

    useEffect(()=>{

      if(location.state){
        setSolve(location.state.solve);
        if(location.state.solve){
          const interval = setInterval(() => {
          
            if (progress >= user.user.experience) {
              clearInterval(interval);
              return;
            }
      
            setProgress(prevProgress => prevProgress + 1);
          }, 50);
            
          return () => clearInterval(interval);

        }
      }

      
      if(user.user.experience === 0){
        dispatch(setLevelTest());
      }else{
        dispatch(setStockTest());
      }
      
    }, [progress]);

  return (
    <>
    {solve && 'choiceList' in location.state? 
      <Flex direction="column" justify="center" align="center" h="100vh">
        {modal&&
          <Overlay className={classes.overlay} fixed display={"flex"}>
            <Flex bg="block.5" w="600px" h="600px" direction="column" align="center">
              <Flex w="100%" p="20px" direction="column" align="center">
                <Text size="16px" fw="600">점수</Text>
                <Text lh="50px" size="28px" fw="600">
                  {location.state.correct} / {location.state.total}
                </Text>
              </Flex>
              <ScrollArea w="500px" h="400px">
                {question}
              </ScrollArea>
              <Button m="xl" w="400px" h="50px" color="primary.5" onClick={()=>{setModal(false)}} size="20px">확인</Button>
            </Flex>
          </Overlay>
        }
        
        <Flex direction="column" justify="center" align="center">
          <Flex direction="column" w="100%">
            <Flex w="100%" justify="space-between">
              <Text size="24px" fw="600" c={`${color[numLevel]}`}>{level[numLevel]}</Text>
              <Text size="24px" fw="600" c={`${color[numLevel+1]}`}>{level[numLevel+1]}</Text>
            </Flex>
            <Progress value={progress} w="100%" mb="20px" size="13px" bg="primary.5" color="blue.5" />
          </Flex>
          <Flex pos="relative">
            <Flex className={classes.cardFrame}>
              <div className={classes.card}>
                <Flex className={classes.cardContent} direction={"column"} justify={"center"} align={"center"} bg={`linear-gradient(${color[numLevel]},var(--mantine-color-white-5),${color[numLevel]})`}>
                  <Text size="60px" fw="400" className={classes.level} >
                    {level[numLevel]}
                  </Text>
                </Flex>
              </div>
            </Flex>
            {user.user.experience >= 1000 &&<Flex pos="absolute" right="400px" bottom="-100px"> 
              <div className={classes.card}>
                <Flex className={classes.cardContent} direction={"column"} justify={"center"} align={"center"} bg={`linear-gradient(${color[numLevel-1]},var(--mantine-color-white-5),${color[numLevel-1]})`} opacity="30%">
                  <Text size="60px" fw="400" className={classes.level} >
                    {level[numLevel-1]}
                  </Text>
                </Flex>
              </div>
            </Flex>}
            {user.user.experience < 100 && <Flex pos="absolute" left="400px" bottom="-100px">
              <div className={classes.card}>
                <Flex className={classes.cardContent} direction={"column"} justify={"center"} align={"center"} bg={`linear-gradient(${color[numLevel+1]},var(--mantine-color-white-5),${color[numLevel+1]})`} opacity="30%">
                  <Text size="60px" fw="400" className={classes.level} >
                    {level[numLevel+1]}
                  </Text>
                </Flex>
              </div>
            </Flex>}
          </Flex>
        </Flex>
        <Flex align="center" justify="center" p="30px" gap="10px" pos="relative">
          <Text lh="50px" size="28px" fw="600">
            {location.state.correct} / {location.state.total}
          </Text>
          <Image className={classes.questionMark} h="50px" w="50px" pos="absolute" right="-25px" src={questionMark} onClick={()=>{setModal(true)}} />
        </Flex>
      </Flex>
      :
      <Flex direction="column" justify="center" align="center" h="100vh" gap="50px">
        <Text size="28px" fw="600">
          {user.user.experience === 0 ? "퀴즈를 풀어서 레벨을 측정해 보세요." : "퀴즈를 풀어서 경험치를 올려보세요." }
        </Text>
        {user.user.experience === 0 ?
          <Flex className={classes.cardContent} direction={"column"} w="300px" h="400px" justify={"center"} align={"center"} bg="linear-gradient(var(--mantine-color-primary-5),var(--mantine-color-white-5),var(--mantine-color-primary-5))">
              <Text size="60px" fw="400" className={classes.level} >
                ?
              </Text>
          </Flex>
        :
          <Image src={test} w="400px"/>
        }
        <Button m="10px" w="400px" color="primary.5" h="50px" size="20px" onClick={()=>{navigate('/quiztest', {state:{level: true }})}}>
            퀴즈 풀기
        </Button>
      </Flex>
    }
    </>
  )
}
