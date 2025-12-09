import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import { PageNotFound } from '../pages/PageNotFound'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from './Home'
const PublicRoutes = () => {
  return (
 
   <Routes>
    <Route path='/' element={<Home/>}>
      <Route path='' element={<LandingPage/>}/>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='*' element={<PageNotFound/>}/>
    </Route>
        
      </Routes>
      
  )
}

export default PublicRoutes