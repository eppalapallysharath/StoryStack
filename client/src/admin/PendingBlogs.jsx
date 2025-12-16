import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../constants/apiurl";
import { Container, Table, Button, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const PendingBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  const fetchPendingBlogs = () => {
    setLoading(true);
    axios
      .get(`${baseurl}/api/admin/posts/pending/`, {
        headers: { Authorization: "Bearer " + token },
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
    fetchPendingBlogs();
  }, []);

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">Pending Blogs</h3>

      <Table bordered hover responsive className="admin-table align-middle">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr className="text-center">
              <td colSpan={4}>
                <Spinner size="sm" className="me-2" />
                Loading pending blogs...
              </td>
            </tr>
          )}

          {!loading && data.length === 0 && (
            <tr className="text-center">
              <td colSpan={4} className="text-muted">
                No pending blogs to approve
              </td>
            </tr>
          )}

          {!loading &&
            data.map((blog) => (
              <tr key={blog.id}>
                <td className="fw-semibold">{blog.title}</td>
                <td>{blog.author_name}</td>
                <td>
                  <Badge bg="warning">{blog.status}</Badge>
                </td>
                <td>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/pendingblog/${blog.id}`)
                    }
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
