import { Button, Flex, Overlay, Text } from '@mantine/core'
import classes from '../styles/MainPage.module.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function MainPage() {
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
              <Text size='22px' >회원가입이 완료되었습니다.</Text>
              <Text size='14px'>계좌가 개설되었습니다.</Text>
              <Flex  direction="column">
                  <Flex gap="10px">
                    <Text size='18px'>계좌</Text>
                    <Text size='18px'>110-222-3311333</Text>
                  </Flex> 
                  <Flex gap="10px">
                    <Text size='18px'>자산</Text>
                    <Text size='18px'>₩ 10,000,000</Text>
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
          {/* <span className={classes.redText}><div className={classes.point}></div>투</span>데이 <span className={classes.blueText}><div className={classes.point}></div>투</span>자는 */}
        </Text>
        <Text size='52px' className={classes.secondText}>
          {/* <span className={classes.to}><div className={classes.point2}></div>TO</span><span className={classes.to}><div className={classes.point2}></div>TO</span> 에서 */}
        </Text>
        <div className={classes.firstPageColor}></div>
      </Flex>
      <Flex className={classes.page}>
        
      </Flex>

      <Flex>
      
      </Flex>
    </Flex>
  )
}
