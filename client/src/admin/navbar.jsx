import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import logo from "../assets/images/default.png";
import { NavLink, useNavigate } from "react-router-dom";

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);

  const logout = () => {
    setAuth({ isLogin: false, user: {}, token: null });
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <Image src={logo} width={40} height={40} rounded />
          <span className="ms-2 fw-bold">StoryStack Admin</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto gap-3">
            <NavLink className="nav-link" to="/">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/admin/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/admin/pendingblogs">
              Pending Blogs
            </NavLink>
          </Nav>

          <Button
            variant="outline-warning"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
