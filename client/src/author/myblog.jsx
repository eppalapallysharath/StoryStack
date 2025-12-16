import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";

export const MyBlog = () => {
  const { id } = useParams();
  const getToken = JSON.parse(localStorage.getItem("auth"));
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchblog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseurl}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${getToken.token}` },
      });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchblog();
  }, []);

  const deleteBlog = async (blogId) => {
    try {
      const res = await axios.delete(
        `${baseurl}/api/posts/${blogId}/delete/`,
        { headers: { Authorization: `Bearer ${getToken.token}` } }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/myblogs");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center blog-loader">
        <Spinner animation="border" />
        <span className="ms-2">Loading blog...</span>
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Card className="blog-detail-card mx-auto">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h3 className="fw-bold mb-1">{data.title}</h3>
              <Badge
                bg={
                  data.status === "PENDING"
                    ? "warning"
                    : data.status === "ACCEPTED"
                    ? "success"
                    : "danger"
                }
              >
                {data.status}
              </Badge>
            </div>

            <div className="d-flex gap-2">
              <Button
                size="sm"
                variant="outline-dark"
                onClick={() =>
                  navigate(`/editblog/${data.id}`, { state: data })
                }
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteBlog(data.id)}
              >
                Delete
              </Button>
            </div>
          </div>

          <hr />

          <div className="blog-content-full">
            {data.content}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
