import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurl } from '../constants/apiurl'
import { Container, Card, Spinner } from 'react-bootstrap'

export const Blog = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${baseurl}/api/public/posts/${id}/`)
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center blog-loader">
        <Spinner animation="border" />
        <span className="ms-2">Loading story...</span>
      </div>
    )
  }

  return (
    <Container className="py-4">
      <Card className="blog-detail-card mx-auto">
        <Card.Body>
          <h2 className="fw-bold mb-3">{data.title}</h2>

          <p className="text-muted mb-4">
            ✍️ {data.author_name || "StoryStack Author"}
          </p>

          <div className="blog-content-full">
            {data.content}
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
