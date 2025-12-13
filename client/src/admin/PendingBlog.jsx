import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl, token } from "../constants/apiurl";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Badge from "react-bootstrap/Badge";
import { toast } from "react-toastify";

export const PendingBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate()

  const fetchBlog = () => {
    axios
      .get(`${baseurl}/api/admin/posts/pending/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  
  const changeStatus = (blogStatus) =>{
    axios.put(`${baseurl}/api/admin/posts/${id}/status/`, {status:blogStatus}, {headers:{Authorization: `Bearer ${token}` }})
    .then(res=>{console.log(res.data); toast.success(res.data.message+ " "+ res.data.status); navigate("/admin/pendingblogs") }).catch(err =>console.log(err))
  }

  return (
    <>
      {Object.keys(data).length > 0 ? (
        <Card>
          <Card.Header>
            <Card.Title>
              <span>{data.title.toUpperCase()}</span>
              <span>
                 <Badge variant="success">{data.status}</Badge>
              </span>
              <Button ref={target} onClick={() => setShow(!show)} size="sm" variant="dark">
                Options
              </Button>
              <Overlay target={target.current} show={show} placement="right" >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    <Button variant="success" size="sm" onClick={()=>changeStatus("APPROVED")}>Approved</Button>
                    <hr/>
                    <Button variant="danger" size="sm" onClick={()=>changeStatus("REJECTED")}>Rejected</Button>
                  </Tooltip>
                )}
              </Overlay>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{data.content}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <h3 className="text-center">Loading....</h3>
      )}
    </>
  );
};
