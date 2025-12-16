import { useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseurl}/api/auth/login/`, {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setAuth(prev => ({
          ...prev,
          isLogin: true,
          user: res.data.user,
          token: res.data.token,
        }));
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center auth-container">
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <h3 className="text-center fw-bold mb-2">Welcome Back 👋</h3>
              <p className="text-center text-muted mb-4">
                Login to continue writing on <strong>StoryStack</strong>
              </p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  className="w-100"
                  onClick={login}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" /> Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small>
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    Sign up
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
