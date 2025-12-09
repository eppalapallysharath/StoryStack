import { useState, useContext } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setAuth} = useContext(authContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async()=>{
    try{
      setLoading(true)
      const res = await axios.post(`${baseurl}/api/auth/login/`,{
        email:email,
        password:password
      })
      console.log(res)
      if(res.status ===200){
        toast.success(res.data.message);
        setAuth(prev=> {return {...prev, isLogin:true, user:res.data.user, token:res.data.token}})
        setLoading(false)
        navigate("/")
      }
    } 
    catch(err){
      console.log(err)
      toast.error(err.response.data.message)
      setLoading(false)
    }
  }

  return (
     <Form>
      <div>
        <p className="h4">Login</p>
      </div>
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
      <Button variant="success" onClick={login} disabled={loading}>
        Login
      </Button>
    </Form>
  )
}
