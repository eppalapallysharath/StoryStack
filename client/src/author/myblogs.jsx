import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../constants/apiurl";

export const MyBlogs = () => {
  const getToken = JSON.parse(localStorage.getItem("auth"));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchMyPosts = () => {
    setLoading(true);
    axios
      .get(baseurl + "/api/posts/my-posts/", {
        headers: { Authorization: "Bearer " + getToken.token },
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
    fetchMyPosts();
  }, []);

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">My Blogs</h3>

      {loading && (
        <div className="d-flex align-items-center">
          <Spinner animation="border" size="sm" className="me-2" />
          Loading your blogs...
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className="text-muted">
          You haven’t written any blogs yet.
        </p>
      )}

      <Row className="g-4">
        {data.map((blog) => (
          <Col md={6} lg={4} key={blog.id}>
            <Card
              className="myblog-card h-100"
              onClick={() => navigate(`/myblog/${blog.id}`)}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="fw-bold">
                    {blog.title}
                  </Card.Title>

                  <Badge
                    bg={
                      blog.status === "PENDING"
                        ? "warning"
                        : blog.status === "ACCEPTED"
                        ? "success"
                        : "danger"
                    }
                  >
                    {blog.status}
                  </Badge>
                </div>

                <Card.Text className="text-muted blog-preview">
                  {blog.content}
                </Card.Text>
              </Card.Body>

              <Card.Footer className="bg-white border-0">
                <small className="text-muted">
                  Click to view details
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
