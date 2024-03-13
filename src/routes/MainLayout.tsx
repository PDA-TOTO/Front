import React from 'react'
import Navbar from '../components/common/Navbar'
import { Outlet } from 'react-router-dom'
import { Flex } from '@mantine/core'

export default function MainLayout() {
  return (
    <Flex>
        <Navbar />
        <Outlet />
    </Flex>
  )
}

