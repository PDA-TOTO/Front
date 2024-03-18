import { Button, Flex , Text, Image} from "@mantine/core"
import { useNavigate, useLocation } from "react-router-dom"
import test from "../../assets/img/quiz.png"
import { useEffect, useState } from "react";

export default function QuizMainPage() {
    const navigate = useNavigate();
    const [solve, setSolve] = useState(false);

    const location = useLocation();
    
    useEffect(()=>{
      setSolve(location.state.solve);

    })

  return (
    <>
    {solve ? 
      <Flex direction="column" justify="center" align="center" h="100vh">
          <Text size="22px">
            퀴즈 끝
          </Text>
          <Image src={test} w="300px"/>
          <Text size="22px">
            {location.state.correct} / {location.state.total}
          </Text>
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
