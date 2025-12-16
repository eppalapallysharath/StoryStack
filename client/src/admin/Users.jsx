import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../constants/apiurl";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

export const Users = () => {
  const [data, setData] = useState([]);
  const { token } = JSON.parse(localStorage.getItem("auth"));

  const fetchUsers = () => {
    axios
      .get(`${baseurl}/api/admin/users/`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = (userid, role) => {
    axios
      .put(
        `${baseurl}/api/admin/users/${userid}/role/`,
        { role },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">User Management</h3>

      <Table bordered hover responsive className="align-middle admin-table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td className="fw-semibold">{user.name}</td>
              <td>{user.email}</td>

              <td>
                <Badge bg={user.role === "ADMIN" ? "danger" : "success"}>
                  {user.role}
                </Badge>
              </td>

              <td>
                {user.role === "ADMIN" ? (
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => changeRole(user.id, "AUTHOR")}
                  >
                    Make Author
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline-dark"
                    onClick={() => changeRole(user.id, "ADMIN")}
                  >
                    Make Admin
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {data.length === 0 && (
        <p className="text-muted text-center mt-4">
          No users found.
        </p>
      )}
    </Container>
  );
};
