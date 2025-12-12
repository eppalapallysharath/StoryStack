import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../constants/apiurl'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


export const Users = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const {token} = JSON.parse(localStorage.getItem("auth"))
    const fetchUsers=()=>{
        axios.get(`${baseurl}/api/admin/users/`, {headers:{Authorization:"Bearer " +token}})
        .then(res=> setData(res.data))
        .catch(error=>console.log(error))
    }
    useEffect(()=>{
        fetchUsers()
    },[])
  return (
    <div>Users
         <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>User Id</th>
          <th>Name</th>
          <th> Email</th>
          <th>Update Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user=>  <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <div> <span>Change user role from <Button disabled={true}>{user.role}</Button> </span><Button>Admin</Button></div>
                <div><Button variant='danger'>Delete</Button></div>
            </td>
        </tr>)}
      </tbody>
      
    </Table>
    </div>
  )
}
