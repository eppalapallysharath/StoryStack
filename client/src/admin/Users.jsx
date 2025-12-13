import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../constants/apiurl";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
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


  const changeRole = (userid,role) => {
    axios.put(`${baseurl}/api/admin/users/${userid}/role/`, {role:role}, {headers:{Authorization:"Bearer " + token }})
    .then(res => {toast.success(res.data.message); fetchUsers()})
    .catch(err=> {console.log(err); toast.error(err.message)})
  };

  return (
    <div>
      Users
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Update Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                {/* Show current role */}
                <div style={{ marginBottom: "10px" }}>
                  Current Role:{" "}
                  <span>
                    {user.role === "AUTHOR" && (
                      <Badge bg="success">{user.role}</Badge>
                    )}{" "}
                    {user.role === "ADMIN" && (
                      <Badge bg="danger">{user.role}</Badge>
                    )}{" "}
                  </span>
                  {user.role === "ADMIN" ? (
                    <Button
                      size="sm"
                      variant="dark"
                      onClick={() => changeRole( user.id,"AUTHOR")}
                    >
                      Change to Author
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="dark"
                      onClick={() => changeRole(user.id,"ADMIN")}
                    >
                      Change to Admin
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
