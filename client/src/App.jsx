import React from 'react'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import PublicRoutes from './components/PublicRoutes'

export const App = () => {
  const isLogin = {
    login : true,
    role:"admin"
  } 
  return (
    <>
      {isLogin.login ? <ProtectedRoutes user={isLogin}/> : <PublicRoutes/>}
    </>
  )
}
