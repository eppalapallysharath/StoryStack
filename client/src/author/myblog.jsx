import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export const MyBlog = () => {
  const { id } = useParams();
  const getToken = JSON.parse(localStorage.getItem("auth"));
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const fetchblog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseurl}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${getToken.token}` },
      });
      if (res.status === 200) {
        setLoading(false);
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchblog();
  }, []);

  const deleteBlog = async(blogId) => {
      try{
        const res = await axios.delete(`${baseurl}/api/posts/${blogId}/delete/`, {
        headers: { Authorization: `Bearer ${getToken.token}` },
      })
        if(res.status === 200){
          toast.success(res.data.message)
          navigate("/myblogs")
        }
      }
      catch(err){
        console.log(err)
        toast.error(err.message)
      }
  };

  return (
    <div>
      <h3>My Blog</h3>
      {loading ? (
        <h4>Loading....</h4>
      ) : (
        <Card>
          <Card.Header>
            <Card.Title>
              {data.title} 
              <span>
                {data.status === "PENDING" && (
                  <Badge bg="warning">{data.status}</Badge>
                )}{" "}
                {data.status === "ACCEPTED" && (
                  <Badge bg="success">{data.status}</Badge>
                )}
                {data.status === "REJECTED" && (
                  <Badge bg="danger">{data.status}</Badge>
                )}
              </span>
              <Button variant="dark" onClick={()=>navigate("/editblog/"+data.id, {state:data})}>Edit</Button>
              <Button variant="danger" onClick={()=>deleteBlog(data.id)}>
                Delete
              </Button>
            </Card.Title>
          </Card.Header>
          <Card.Body>{data.content}</Card.Body>
        </Card>
      )}
    </div>
  );
};
