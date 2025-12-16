import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export const AdminHomePage = () => {
  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">Admin Dashboard</h3>

      <Row className="g-4">
        <Col md={4}>
          <Card className="admin-card text-center">
            <Card.Body>
              <h5 className="fw-bold">Total Users</h5>
              <h2 className="text-primary mt-2">—</h2>
              <p className="text-muted mb-0">Registered users</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card text-center">
            <Card.Body>
              <h5 className="fw-bold">Total Blogs</h5>
              <h2 className="text-success mt-2">—</h2>
              <p className="text-muted mb-0">Published blogs</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="admin-card text-center">
            <Card.Body>
              <h5 className="fw-bold">Pending Blogs</h5>
              <h2 className="text-warning mt-2">—</h2>
              <p className="text-muted mb-0">Awaiting approval</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-5">
        <h5 className="fw-semibold mb-2">Quick Actions</h5>
        <p className="text-muted">
          Use the navigation above to manage users and review pending blogs.
        </p>
      </div>
    </Container>
  );
};
