import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center notfound-container">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h4 className="fw-semibold mb-2">Page Not Found</h4>
      <p className="text-muted text-center mb-4">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Button variant="dark" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </Container>
  );
};
