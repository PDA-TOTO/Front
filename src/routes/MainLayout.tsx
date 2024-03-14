import React from 'react'
import Navbar from '../components/common/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Flex } from '@mantine/core'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Flex justify='right'>
          <Outlet />
      </Flex>
    </>
  )
}

