import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { authContext } from '../context/authContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from "../assets/images/default.png"
import { NavLink, useNavigate } from 'react-router-dom';


export const AdminNavbar = () => {
  const navigate = useNavigate()
  const { setAuth} = useContext(authContext)
      const logout = () =>{
        setAuth({isLogin: false , user:{},token:null})
      }
  
  return (
  <Navbar collapseOnSelect expand="lg"  bg="danger" data-bs-theme="primary">
      <Container>
        <Navbar.Brand href="#home" onClick={()=>navigate("/")}> <Image src={logo} width={"120px"} height={"100px"} /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
          <NavLink to={"/"}>Admin HomePage</NavLink>
          <NavLink to={'/admin/users'} >Users</NavLink>
          <NavLink to={"/admin/pendingblogs"}>Pending blogs</NavLink>
          </Nav>
          <Button variant='warning' size='sm' onClick={logout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
