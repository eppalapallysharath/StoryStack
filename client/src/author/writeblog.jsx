import axios from "axios";
import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Writeblog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const getToken = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  const createPost = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseurl}/api/posts/`,
        { title, content },
        { headers: { Authorization: "Bearer " + getToken.token } }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigate("/myblogs");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      });
  };

  return (
    <Container className="py-4">
      <Card className="editor-card mx-auto">
        <Card.Body>
          <h4 className="fw-bold mb-3">Write a New Story</h4>
          <p className="text-muted mb-4">
            Share your thoughts with the StoryStack community ✨
          </p>

          <Form onSubmit={createPost}>
            <Form.Group className="mb-3">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter a compelling title..."
                minLength={6}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Blog Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Start writing your story here..."
                minLength={20}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Minimum 20 characters required.
              </Form.Text>
            </Form.Group>

            <div className="text-end">
              <Button variant="dark" type="submit">
                Publish Blog
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
