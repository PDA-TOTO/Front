import { Button, Flex , Text, Image, Overlay, ScrollArea, Badge} from "@mantine/core"
import { useNavigate, useLocation } from "react-router-dom"
import test from "../../assets/img/quiz/quiz.png";
import silver from "../../assets/img/quiz/silver.png";
import { useEffect, useState } from "react";
import questionMark from "../../assets/img/quiz/questionMark.png";
import classes from "../../styles/quiz/QuizMain.module.css"
import { useAppSelector } from "../../lib/hooks/reduxHooks";

export default function QuizMainPage() {
    const navigate = useNavigate();
    const [solve, setSolve] = useState(false);
    const [modal, setModal] = useState(false);
    const quizs = useAppSelector(state => state.quiz);

    const location = useLocation();
    
    const question = location.state.solve && quizs.map((value,index)=>{
      return(
      <Flex direction="column" justify="center" align="center" pt="40px" >
        <Flex direction="column" w="400px" gap="15px" mb="20px">
          <Flex align="center" gap="10px">
            <Text size="18px">{index+1}.</Text>
            {value.answer === location.state.choiceList[index]+1 ?
              <Badge color="blue.3" c="primary.5" size="lg">정답</Badge>
              :
              <Badge color="red.3" c="primary.5" size="lg">오답</Badge>
            }
          </Flex>
          <Text size="18px" lh="20px">{value.question}</Text>
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
                      <Text>{v}</Text>
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
                      <Text>{v}</Text>
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
    },[])

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
              <Button m="xl" w="400px" h="50px" color="primary.5" onClick={()=>{setModal(false)}}>확인</Button>
            </Flex>
          </Overlay>
        }
        <Flex direction="column" justify="center" align="center" h="100vh">
          <Flex className={classes.cardFrame}>
              <Flex direction="column" className={classes.card} justify="center" align="center" gap="30px">
                <Text size="28px" fw="600">
                  Silver
                </Text>
                <Image src={silver} w="200px"/>
              </Flex>
            </Flex>
        </Flex>
        <Flex align="center" justify="center" p="30px">
          <Text lh="50px" size="22px" fw="600">
            {location.state.correct} / {location.state.total}
          </Text>
          <Image className={classes.questionMark} h="50px" w="50px" src={questionMark} onClick={()=>{setModal(true)}} />
        </Flex>
      </Flex>
      :
      <Flex direction="column" justify="center" align="center" h="100vh">
        <Text size="22px">
          퀴즈를 풀어서 경험치를 올려보세요.
        </Text>
        <Image src={test} w="300px"/>
        <Button m="10px" w="300px" color="primary.5" onClick={()=>{navigate('/quiztest')}}>
            퀴즈 풀기
        </Button>
      </Flex>
    }
    </>
  )
}
