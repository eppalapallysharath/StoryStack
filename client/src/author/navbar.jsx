import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { authContext } from '../context/authContext'

export const AuthorNavbar = () => {
  const { setAuth} = useContext(authContext)
    const logout = () =>{
      setAuth({isLogin: false , user:{},token:null})
    }
  return (
    <div>
        <h3>Author navbar</h3>
        <Button onClick={logout}>Logout</Button>
    </div>
  )
}
