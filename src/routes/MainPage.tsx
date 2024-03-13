import { Flex, Text } from '@mantine/core'
import classes from '../styles/MainPage.module.css';
import React from 'react'

export default function MainPage() {
  return (
    <Flex direction='column' className={classes.mainPage}>
      <Flex className={classes.page} direction='column' justify='center' align='center'>
        <Text color='primary.5' size='52px' className={classes.firstText}>
          <span className={classes.redText}><div className={classes.point}></div>투</span>데이 <span className={classes.blueText}><div className={classes.point}></div>투</span>자는
        </Text>
        <Text size='52px' className={classes.secondText}>
          <span className={classes.to}><div className={classes.point2}></div>TO</span><span className={classes.to}><div className={classes.point2}></div>TO</span> 에서
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
