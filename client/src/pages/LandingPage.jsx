import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'

export const LandingPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section text-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold">Share Your Stories with the World</h1>
              <p className="mt-3">
                StoryStack is a modern blogging platform where writers create,
                publish, and grow their audience.
              </p>
              <Button variant="warning" className="me-3">Get Started</Button>
              <Button variant="outline-light">Explore Blogs</Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURES SECTION */}
      <Container className="py-5">
        <Row className="text-center mb-4">
          <h2 className="fw-bold">Why StoryStack?</h2>
          <p className="text-muted">Everything you need to start blogging</p>
        </Row>

        <Row>
          {[
            { title: "Write Blogs", text: "Create and manage your blogs easily." },
            { title: "Admin Approval", text: "Quality control with admin moderation." },
            { title: "Secure Access", text: "JWT-based authentication & roles." }
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <Card className="shadow-sm border-0 text-center p-3">
                <Card.Body>
                  <Card.Title className="fw-bold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
