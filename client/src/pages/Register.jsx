import { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../context/authContext";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext);
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseurl}/api/auth/register/`, {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setAuth(prev => ({
          ...prev,
          isLogin: true,
          user: res.data.user,
          token: res.data.token,
        }));
        navigate("/");
      }
    } catch (er) {
      toast.error(er.response?.data?.message || "Registration failed");
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
              <h3 className="text-center fw-bold mb-2">Create Account ✨</h3>
              <p className="text-center text-muted mb-4">
                Join <strong>StoryStack</strong> and start writing today
              </p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  className="w-100"
                  onClick={signup}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" /> Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
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
