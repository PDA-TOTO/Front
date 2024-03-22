import { Button, Flex , Text, Image, Overlay, ScrollArea, Badge, Progress} from "@mantine/core"
import { useNavigate, useLocation } from "react-router-dom"
import test from "../../assets/img/quiz/quiz.png";
import { useEffect, useState } from "react";
import questionMark from "../../assets/img/quiz/questionMark.png";
import classes from "../../styles/quiz/QuizMain.module.css"
import { useAppSelector } from "../../lib/hooks/reduxHooks";

export default function QuizMainPage() {
    const navigate = useNavigate();
    const [solve, setSolve] = useState(false);
    const [modal, setModal] = useState(false);
    const quizs = useAppSelector(state => state.quiz);
    const [progress,setProgress] = useState(30);

    const location = useLocation();
    
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
            {[value.answer1,value.answer2,value.answer3,value.answer4].map((v,idx)=>{
              if(idx === location.state.choiceList[index]){
                return(
                    <Flex gap="10px" w="400px" pl="15px">
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
                    <Flex gap="10px" w="400px" pl="15px">
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
      }

      const interval = setInterval(() => {
        
        if (progress >= 80) {
          clearInterval(interval);
          return;
        }
  
        setProgress(prevProgress => prevProgress + 1);
      }, 50);
    
        return () => clearInterval(interval);
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
              <Text size="24px" fw="600" c="blue.5">Silver</Text>
              <Text size="24px" fw="600" c="red.5">Gold</Text>
            </Flex>
            <Progress value={progress} w="100%" mb="20px" size="13px" bg="primary.5" color="blue.5" />
          </Flex>
          <Flex pos="relative">
            <Flex className={classes.cardFrame}>
              <div className={classes.card}>
                <Flex className={classes.cardContent} direction={"column"} justify={"center"} align={"center"} bg="linear-gradient(gray,var(--mantine-color-white-5),gray)">
                  <Text size="60px" fw="400" className={classes.level} >
                    Silver
                  </Text>
                </Flex>
              </div>
            </Flex>
            <Flex pos="absolute" right="400px" bottom="-100px"> 
              <div className={classes.card}>
                <Flex className={classes.cardContent} direction={"column"} justify={"center"} align={"center"} bg="linear-gradient(var(--mantine-color-blue-7),var(--mantine-color-white-5),var(--mantine-color-blue-7))" opacity="30%">
                  <Text size="60px" fw="400" className={classes.level} >
                    Bronze
                  </Text>
                </Flex>
              </div>
            </Flex>
            <Flex pos="absolute" left="400px" bottom="-100px">
              <div className={classes.card}>
                <Flex className={classes.cardContent} direction={"column"} justify={"center"} align={"center"} bg="linear-gradient(var(--mantine-color-red-7),var(--mantine-color-white-5),var(--mantine-color-red-7))" opacity="30%">
                  <Text size="60px" fw="400" className={classes.level} >
                    Gold
                  </Text>
                </Flex>
              </div>
            </Flex>
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
          퀴즈를 풀어서 경험치를 올려보세요.
        </Text>
        <Image src={test} w="400px"/>
        <Button m="10px" w="400px" color="primary.5" h="50px" size="20px" onClick={()=>{navigate('/quiztest')}}>
            퀴즈 풀기
        </Button>
      </Flex>
    }
    </>
  )
}
