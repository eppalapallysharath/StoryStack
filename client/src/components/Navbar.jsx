import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import logo from "../assets/images/default.png"
import { NavLink, useNavigate } from 'react-router-dom';

export const NavbarLandingPage = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <Image src={logo} width={45} height={45} rounded />
          <span className="ms-2 fw-bold">StoryStack</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-3">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/register">Signup</NavLink>
            <NavLink className="nav-link" to="/login">
              <Button variant="outline-light" size="sm">Login</Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
