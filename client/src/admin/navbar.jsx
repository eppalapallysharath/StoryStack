import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { authContext } from '../context/authContext'

export const AdminNavbar = () => {
  const { setAuth} = useContext(authContext)
      const logout = () =>{
        setAuth({isLogin: false , user:{},token:null})
      }
  return (
    <div>
        <h4>Admin navbar</h4>
        <Button onClick={logout}>Logout</Button>

    </div>
  )
}
