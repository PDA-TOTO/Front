import { useState } from 'react'
import test from '../../assets/data/tendency.json';
import { Button, Flex, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from "../../styles/quiz/Tendency.module.css"
import AnswerSheet from '../../components/quiz/AnswerSheet';
import { useNavigate } from 'react-router-dom';
import { tendency } from '../../lib/apis/user';
import { userGetinfo } from '../../store/reducers/user';
import { useAppDispatch } from '../../lib/hooks/reduxHooks';


export default function TendencyTestPage() {
    const [choiceList, setChoiceList] = useState(test.map(()=>-1))
    const [number, setNumber] = useState(1);
    const [isSolved, setIsSolved] = useState(test.map(()=>false));
    const optionsCnt = test.map((value)=> value.options.length);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function onClickOption(qno:number,ono:number){
        setChoiceList(choiceList.map((value,index)=>{
          if(index === qno){
            return ono;
          }else{
            return value;
          }
        }))

        setIsSolved(isSolved.map((value,index)=>{
            if(index === qno){
              return true;
            }else{
              return value;
            }
          }))

    }


    const quiz = test.map((value,index)=>{
        return(
            <Flex key={index} direction="column" align="center" py="20px" w="calc( 100vw - var(--answer-sheet-w))" gap="30px" >
                <Text fw="bolder" size="20px" w="70%" bg="secondary.5" py="20px" px="30px" lh="30px" className={classes.border}>{index+1}. {value.question}</Text>
                <Flex direction="column" gap="10px" py="30px" w="70%" px="20px">
                    {
                        value.options.map((val,idx)=>{
                            return(
                                <Flex key={idx} >
                                    {choiceList[index] === idx?
                                        <div key={idx} className={classes.option} onClick={()=>{onClickOption(index,idx)}}>
                                            <div className={classes.answerBorder}></div>
                                            <div className={classes.answerText}>{idx+1}</div>
                                        </div>
                                        :
                                        <div key={idx} className={classes.option} onClick={()=>{onClickOption(index,idx)}}>
                                            <div className={classes.optionBorder}></div>
                                            <div className={classes.optionText}>{idx+1}</div>
                                        </div>
                                    }
                                    <Text fw="600" size="18px" mx="10px" c="primary.3" lh="30px" >{val.option}</Text>
                                </Flex>
                            )
                        })
                    }
                </Flex>
            </Flex>
        )
    })

    function onClickExit(){
        if(choiceList.includes(-1)){
            let message = "";

            choiceList.map((value,index)=>{
                if(value === -1) {
                    message += ((index+1).toString()+"번 ")
                }
            })
            notifications.show({
                title: "모든 문제를 풀어주세요.",
                message: message + " 풀어주세요!"
            })
        }else{
            let point = 0;
            test.map((value,index)=>{
                point += value.options[choiceList[index]].point;
            })
            console.log(number);

            tendency(point).then((data)=>{
                
                dispatch(userGetinfo());
                notifications.show({
                    title: "투자 성향 테스트 완료",
                    message: data.data.message,
                })
                navigate('/my');

            })

        }
    }

 
  return (
    <Flex>
        <Flex className={classes.page}>
            <Flex w="100%" pos="fixed" top="0" bg="white.5" className={classes.exit} >
                <Button m="10px" w="150px" c="primary.5"   color="secondary.5" onClick={onClickExit}>
                    종료하기
                </Button>
            </Flex>
            <Flex direction="column" align={"center"} py="70px" gap="70px">
                <Text fw="bolder" size="32px">투자 성향 테스트</Text>
                <Flex direction="column" gap="20px" w="calc(100vw - val(--answer-sheet-w))">
                    {quiz}
                </Flex>
            </Flex>
        </Flex>
        <AnswerSheet optionCnt={optionsCnt} count={test.length} setNumber={setNumber} isSolved={isSolved} setIsSolved={setIsSolved} setChoiceList={setChoiceList} choiceList={choiceList}/>
    </Flex>
  )
}
