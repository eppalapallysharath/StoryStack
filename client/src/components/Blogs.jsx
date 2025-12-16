import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { baseurl } from '../constants/apiurl'

export const Blogs = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(baseurl + "/api/public/posts/")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Container>
      <Row className="g-4">
        {data.map(item => (
          <Col md={6} lg={4} key={item.id}>
            <Card
              className="blog-card h-100"
              onClick={() => navigate("/blog/" + item.id)}
            >
              <Card.Body>
                <Badge bg="secondary" className="mb-2">
                  Story
                </Badge>

                <Card.Title className="fw-bold">
                  {item.title}
                </Card.Title>

                <Card.Text className="text-muted blog-content">
                  {item.content}
                </Card.Text>
              </Card.Body>

              <Card.Footer className="bg-white border-0">
                <small className="text-muted">
                  ✍️ {item.author_name}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {data.length === 0 && (
        <p className="text-center text-muted mt-5">
          No blogs published yet.
        </p>
      )}
    </Container>
  )
}
