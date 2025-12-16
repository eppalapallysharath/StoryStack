import React from 'react'
import { NavbarLandingPage } from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

export const Home = () => {
  return (
    <>
      <NavbarLandingPage />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
