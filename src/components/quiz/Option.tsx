import { Flex, Text } from "@mantine/core"
import classes from '../../styles/quiz/AnswerSheet.module.css'

type Props ={
    no: number,
    isSolved: boolean[],
    setIsSolved: React.Dispatch<React.SetStateAction<boolean[]>>,
    choiceList: Array<number>,
    setChoiceList: React.Dispatch<React.SetStateAction<number[]>>,
    setNumber: React.Dispatch<React.SetStateAction<number>>,

}

export default function Option({no, isSolved, setIsSolved, choiceList, setChoiceList, setNumber}:Props) {

    function onClickOption(idx:number){
        setChoiceList(choiceList.map((value,index)=>{
          if(index === no){
            return idx;
          }else{
            return value;
          }
        }))

        setIsSolved(isSolved.map((value,index)=>{
            if(index === no){
              return true;
            }else{
              return value;
            }
          }))
    }

    const list = [1,2,3,4].map((value,idx)=>{
        
        return(
            <>        
                {choiceList[no] === idx?
                    <div key={idx} className={classes.option} onClick={()=>{onClickOption(idx)}}>
                        <div className={classes.answerBorder}></div>
                        <div className={classes.answerText}>{idx+1}</div>
                    </div>
                    :
                    <div key={idx} className={classes.option} onClick={()=>{onClickOption(idx)}}>
                        <div className={classes.optionBorder}></div>
                        <div className={classes.optionText}>{idx+1}</div>
                    </div>
                }
            </>
        )
    })


    return(
        <Flex gap={"24px"} justify={"center"} key={no}>
            <Flex w="28px" h="28px" justify="center" align="center" className={classes.number} onClick={()=>{setNumber(no+1)}}>
                <Text size='18px' ta="center" fw="600" lh="28px"> {no+1}</Text>
            </Flex>
            {list}
        </Flex>
        )
}
