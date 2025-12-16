import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseurl } from "../constants/apiurl";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";

export const EditBlog = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const getToken = JSON.parse(localStorage.getItem("auth"));

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const navigate = useNavigate();

  const fetchblog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseurl}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${getToken.token}` },
      });
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state) {
      fetchblog();
    }
  }, []);

  const updateBlog = async (blogId) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${baseurl}/api/posts/${blogId}/update/`,
        { title, content },
        { headers: { Authorization: `Bearer ${getToken.token}` } }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/myblogs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="editor-card mx-auto">
        <Card.Body>
          <h4 className="fw-bold mb-3">Edit Blog</h4>
          <p className="text-muted mb-4">
            Update your story before publishing changes ✨
          </p>

          {loading && (
            <div className="mb-3">
              <Spinner size="sm" /> Loading...
            </div>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={title}
                minLength={6}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Blog Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={content}
                minLength={20}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <div className="text-end">
              <Button
                variant="dark"
                disabled={loading}
                onClick={() => updateBlog(id)}
              >
                Save & Update Blog
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
