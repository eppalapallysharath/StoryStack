import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../constants/apiurl";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export const PendingBlog = () => {
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBlog = () => {
    setLoading(true);
    axios
      .get(`${baseurl}/api/admin/posts/pending/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const changeStatus = (blogStatus) => {
    axios
      .put(
        `${baseurl}/api/admin/posts/${id}/status/`,
        { status: blogStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res.data.message + " " + res.data.status);
        navigate("/admin/pendingblogs");
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center blog-loader">
        <Spinner animation="border" />
        <span className="ms-2">Loading blog for review...</span>
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
              <Badge bg="warning">{data.status}</Badge>
            </div>

            <div className="d-flex gap-2">
              <Button
                size="sm"
                variant="success"
                onClick={() => changeStatus("APPROVED")}
              >
                Approve
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => changeStatus("REJECTED")}
              >
                Reject
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
