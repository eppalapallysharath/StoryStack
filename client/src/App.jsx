import React, { useEffect, useState } from 'react'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import PublicRoutes from './components/PublicRoutes'
import {ToastContainer } from "react-toastify"
import { authContext } from './context/authContext'

export const App = () => {
  const checkAuth = ( JSON.parse(localStorage.getItem("auth") )|| {isLogin: false , user:{},token:null}) 
  const [auth, setAuth] = useState(checkAuth)
  // console.log(auth)
  useEffect(()=>{
    localStorage.setItem("auth", JSON.stringify(auth))
  },[auth])

  return (
    <authContext.Provider value ={{auth, setAuth}} >
      {auth.isLogin  ? <ProtectedRoutes user={auth.user}/> : <PublicRoutes/>  }
      <ToastContainer />
    </authContext.Provider>
  )
}
