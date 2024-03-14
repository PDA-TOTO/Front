import React from 'react'
import { Flex } from '@mantine/core';
import classes from '../../styles/user/Authentication.module.css'
import { AuthenticationForm } from '../../components/common/user/Authentication';

export default function SignupPage() {
    return (
        <Flex className={classes.page} justify='center' align='center'>
            <AuthenticationForm type='회원가입' />
        </Flex>
      )
}
