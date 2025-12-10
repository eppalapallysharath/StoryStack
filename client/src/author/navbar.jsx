import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { authContext } from '../context/authContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from "../assets/images/default.png"
import { NavLink, useNavigate } from 'react-router-dom';

export const AuthorNavbar = () => {
  const { setAuth} = useContext(authContext)
  const navigate = useNavigate()  
  const logout = () =>{
      setAuth({isLogin: false , user:{},token:null})
    }

  return (
    <div>
         <Navbar collapseOnSelect expand="lg"  bg="danger" data-bs-theme="primary">
      <Container>
        <Navbar.Brand href="#home" onClick={()=>navigate("/")}> <Image src={logo} width={"120px"} height={"100px"} /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={'/writeblog'} >Write Blogs</NavLink>
          <NavLink >MyBlogs</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
