import { useContext, useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { setAuth} = useContext(authContext)
  const [loading, setLoading] = useState(false)
  

  const signup = () => {
    console.log("hi");
    setLoading(true)
    axios
      .post(`${baseurl}/api/auth/register/`, {
        name: name,
        password: password,
        email: email,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          console.log(res.data)
          setAuth((prev)=>{return {...prev,   isLogin:true, user:res.data.user, token:res.data.token}})
          setLoading(false)
          navigate("/")
        }
      })
      .catch((er) => {
        if (er.status === 400) {
          toast.warning(JSON.stringify(er.response.data));
        } else {
          toast.error(er.message), console.log(er);
        }
        setLoading(false)
      });
  };

  return (
    <Form>
      <div>
        <p className="h4">Signup</p>
      </div>
      <Form.Group as={Row} className="mb-3" controlId="name">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="mail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="password">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Col>
      </Form.Group>
      <Button variant="info" onClick={signup} disabled={loading}>
        Signup
      </Button>
    </Form>
  );
};
