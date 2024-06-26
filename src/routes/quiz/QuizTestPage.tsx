import { Flex, Button, Text, Grid } from "@mantine/core";
import AnswerSheet from "../../components/quiz/AnswerSheet";
import { useNavigate } from "react-router-dom";
import classes from "../../styles/quiz/QuizMain.module.css";
import answer from "../../styles/quiz/AnswerSheet.module.css"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/reduxHooks";
import { updateExperience } from "../../lib/apis/quiz";
import { userGetinfo } from "../../store/reducers/user";

export default function QuizTestPage() {
    const navigate = useNavigate();
    const quizs = useAppSelector(state => state.quiz.quiz);
    const [choiceList, setChoiceList] = useState<Array<number>>([])
    const [number, setNumber] = useState(1);
    const [isSolved, setIsSolved] = useState<Array<boolean>>([]);
    const [optionCnt, setOptionCnt] = useState<Array<number>>([])
    const [answers, setAnswers] = useState<Array<number>>([])
    const dispatch = useAppDispatch();

    function onClickOption(idx:number){
        setChoiceList(choiceList.map((value,index)=>{
          if(index === number-1){
            return idx;
          }else{
            return value;
          }
        }))

        setIsSolved(isSolved.map((value,index)=>{
            if(index === number-1){
              return true;
            }else{
              return value;
            }
          }))

    }

    function onClickExit(){
        let correct = 0;
        for(let i = 0; i < choiceList.length; i++){
            if(answers[i]===choiceList[i]+1){
                correct += 1;
            }
        }

        updateExperience(correct*10).then(()=>{
            dispatch(userGetinfo());
        });

        navigate('/quiz',{state:{solve:true, correct: correct, total: choiceList.length, choiceList: choiceList, quizs: quizs}});
    }

    const options = (quizs.length !== 0 ?[quizs[number-1].option1,quizs[number-1].option2,quizs[number-1].option3,quizs[number-1].option4].map((value,idx)=>{
        return(
            <Grid.Col key={idx} span={6} >
                <Flex>
                    {choiceList[number-1] === idx?
                        <div key={idx} className={answer.option} onClick={()=>{onClickOption(idx)}}>
                            <div className={answer.answerBorder}></div>
                            <div className={answer.answerText}>{idx+1}</div>
                        </div>
                        :
                        <div key={idx} className={answer.option} onClick={()=>{onClickOption(idx)}}>
                            <div className={answer.optionBorder}></div>
                            <div className={answer.optionText}>{idx+1}</div>
                        </div>
                    }
                    <Text fw="600" size="18px" p="3px 10px" c="primary.3">{value}</Text>
                </Flex>
            </Grid.Col>
        )
    }):
        null
    )

    useEffect(()=>{

        setAnswers(quizs.map((value)=> value.answer))
        setOptionCnt(quizs.map(()=> 4))
        setChoiceList(quizs.map(()=>-1))
        setIsSolved(quizs.map(()=>false))

    },[])

  return (
    <Flex>
        <div className={classes.page}>
            <Button m="10px" w="150px" c="primary.5" className={classes.exit} color="secondary.5" onClick={onClickExit}>
                종료하기
            </Button>
            <Flex direction="column" m="60px">
                <Text size="36px" fw="600">
                    {number}
                </Text>
                <Text size="22px" m="20px 0px" lh="30px" mih="100px" fw="600">
                    {(quizs.length !== 0) && quizs[number-1].question}
                </Text>
                <Grid>
                    {options}
                </Grid>
            </Flex>
            <Flex p="50px" direction="row" justify="space-between" w="calc(100vw - 300px)" pos={"fixed"} bottom={"0px"}>
                {number > 1 ? 
                <Button miw="100px" c="primary.5" className={classes.exit} color="secondary.5" onClick={()=>{setNumber(number-1)}}>
                    이전문제
                </Button>:
                <div></div>
                }
                {number < quizs.length && <Button miw="100px" color="primary.5" onClick={()=>{setNumber(number+1)}}>
                    다음문제
                </Button>}
            </Flex>
        </div>
        <AnswerSheet optionCnt={optionCnt} count={quizs.length} setNumber={setNumber} isSolved={isSolved} setIsSolved={setIsSolved} setChoiceList={setChoiceList} choiceList={choiceList}/>
    </Flex>
  )
}
