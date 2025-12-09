import React from 'react'
import { NavbarLandingPage } from './Navbar'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
        <NavbarLandingPage/>
        <Outlet/>
    </div>
  )
}
