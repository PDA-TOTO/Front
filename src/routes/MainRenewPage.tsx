import { Button, Flex, Overlay, Text, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import FirstPage from '../components/main/FirstPage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../lib/hooks/reduxHooks';
import classes from '../styles/user/SignupModal.module.css';

const MainRenewPage = () => {
    const [modal, setModal] = useState(false);
    const user = useAppSelector(state=>state.user.user.account)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(location.state){
          setModal(location.state.signup)
        }
    
      },[])
    

    return (
        <>
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
                <Button w="300px" color="primary.5" onClick={()=>{setModal(false); navigate('/quiz',{state:{solve:false}})}}>
                    LEVEL 평가하러 가기
                </Button>
                </Flex>

            </Overlay>
            </>
        }
            <Stack gap={0}>
                <FirstPage />
            </Stack>
        </>
    );
};

export default MainRenewPage;
