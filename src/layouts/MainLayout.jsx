import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Home/Navbar'

export default function MainLayout() {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <Outlet />
    </div>
  )
}
