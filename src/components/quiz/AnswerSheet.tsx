import { useAppSelector } from '../../lib/hooks/reduxHooks'
import { Flex, Stack, Text} from '@mantine/core'
import classes from '../../styles/quiz/AnswerSheet.module.css'
import Option from './Option'

type Props = {
    isSolved: boolean[],
    setIsSolved: React.Dispatch<React.SetStateAction<boolean[]>>,
    choiceList: Array<number>,
    setChoiceList: React.Dispatch<React.SetStateAction<number[]>>,
    setNumber: React.Dispatch<React.SetStateAction<number>>
}

export default function AnswerSheet({ isSolved, setIsSolved, choiceList, setChoiceList, setNumber}: Props) {
    const quizs = useAppSelector(state => state.quiz)

    const quiz = quizs.map((value,idx) => {
        return (
            <Option key={idx} no={idx} setIsSolved={setIsSolved} isSolved={isSolved} choiceList={choiceList} setChoiceList={setChoiceList} setNumber={setNumber}/>
        )
    })


  return (
    <Flex className={classes.page} justify="space-between" align="center" direction={"column"} bg={"secondary.5"}>
        <Flex direction={"column"}>
            <Text ta='center' className={classes.title} size='22px' fw="600" p='xl' w='200px' h='90px' c='primary.5'>
                답안지
            </Text>
            <Stack p="20px 0px" >
                {quiz}
            </Stack>
        </Flex>
        <Flex className={classes.question} direction="column" p='10px 0px' m='40px 0' gap="10px" justify="center" align="center" >
            <Flex ><Text w="120px" ta="center" fw="600">전체 문제</Text><Text color="gray.5">|</Text><Text w="50px" ta="center" fw="600">{quiz.length}</Text></Flex>
            <Flex ><Text  w="120px" ta="center" fw="600">남은 문제</Text><Text color="gray.5">|</Text><Text w="50px" ta="center" fw="600">{quiz.length - (isSolved.filter((v)=> v)).length}</Text></Flex>
            <Flex ><Text  w="120px" ta="center" fw="600">푼 문제</Text><Text color="gray.5">|</Text><Text w="50px" ta="center" fw="600"> {(isSolved.filter((v)=> v)).length}</Text></Flex>
        </Flex>
    </Flex>
  )
}
