import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Stack,
  Text,
  Flex,
} from '@mantine/core';
import classes from '../../../styles/user/Authentication.module.css'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../lib/apis/user';
import { AxiosError } from 'axios';
import { userLogin } from '../../../store/reducers/user';
import { useAppDispatch} from '../../../lib/hooks/reduxHooks';
import { notifications } from '@mantine/notifications';

type props={
    type: string
}




export function AuthenticationForm({type}:props) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const form = useForm({
        initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
        },

        validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid'),
        password: (val) => (val.length <= 5 || val.length > 30 ? 'length' : (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(val) ? null : 'combination'))
        },
    });


    function sendToServer(email:string,password:string){
      if(type === "로그인" || form.values.password === form.values.confirmPassword){

        if(type === "회원가입"){

          signUp(email,password).then(()=>{

            dispatch(userLogin({email,password})).then(()=>{
              navigate('/',{state:{signup:true}});
            });

          }).catch((err:AxiosError<{success:boolean,message:string}>)=>{
              alert(err.response?.data.message)
          });

        }else{
          dispatch(userLogin({email,password})).then(()=>{
            navigate('/');
            notifications.show({
              message:'로그인 완료되었습니다.'
            })
          })
        }
      }


    }
  return (
    <>
      <form className={classes.form} onSubmit={form.onSubmit(() => sendToServer(form.values.email,form.values.password))}>
        <Stack>
            <Text className={classes.formTitle} size='22px' p="lg" fw="600">
                {type}
            </Text>

          <TextInput
            required
            label="이메일"
            placeholder="이메일"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && '형식에 맞지 않는 이메일입니다.'}
            radius="12px"
            styles={{input:{height:'60px', width: '360px', fontSize: '16px'}, label:{fontWeight: 600}}}
          />



            <PasswordInput
            required
            label="비밀번호"
            placeholder="비밀번호"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={(form.errors.password==='length') && '비밀번호는 6자리 이상 입력하십시오.' || (form.errors.password==='combination') && '비밀번호는 숫자와 문자를 조합하여 사용해야합니다.' }
            radius="12px"
            styles={{input:{height:'60px', width: '360px', fontSize: '16px'}, label:{fontWeight: 600}}}
          />

            {type === '회원가입' && <PasswordInput
                required
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                value={form.values.confirmPassword}
                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                error={(form.values.confirmPassword!=='')&&(form.values.password !== form.values.confirmPassword) && '비밀번호가 일치하지 않습니다.'}
                radius="12px"
                styles={{input:{height:'60px', width: '360px', fontSize: '16px'}, label:{fontWeight: 600}}}
            />}
        </Stack>

        <Flex direction='column' justify="space-between" mt="xl">
            <Button type="submit" radius="12px" color='primary.5' h='60px' style={{fontSize:'16px'}}>
                {upperFirst(type)}
            </Button>
            <Anchor fw="600" component="button" type="button" c="dimmed" onClick={() => {type === "회원가입" ? navigate('/login') : navigate('/signup')}} size="xs" p='md' style={{fontSize:'16px'}}>
            {type === '회원가입'
                ? '로그인'
                : '회원가입'}
            </Anchor>

        </Flex>
      </form>
    </>
)}