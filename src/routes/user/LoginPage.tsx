import { Flex } from '@mantine/core';
import classes from '../../styles/user/Authentication.module.css';
import { AuthenticationForm } from '../../components/common/user/Authentication';

export default function LoginPage() {
    return (
        <Flex className={classes.page} justify="center" align="center">
            <AuthenticationForm type="로그인" />
        </Flex>
    );
}
