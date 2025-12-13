import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../constants/apiurl'
import { token } from '../constants/apiurl'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export const PendingBlogs = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const fetchPendingBlogs = () =>{
    setLoading(true)
    axios.get(`${baseurl}/api/admin/posts/pending/`, {headers:{Authorization:"Bearer " + token}})
    .then(res=> {setData(res.data); setLoading(false)}).catch(err =>{console.log(err); setLoading(false)})
  }
  useEffect(()=>{
    fetchPendingBlogs()
  },[])

  
  return (
    <div>
      <h3>Pending Blogs</h3>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Title of blog</th>
          <th>Author</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          loading ? <tr className='text-center'><td colSpan={4}> Loading....</td></tr> :
          data.length > 0 ? data.map(blog=> <tr key={blog.id}>
            <td>{blog.title}</td>
            <td>{blog.author_name}</td>
            <td>{blog.status}</td>
            <td><Button variant='info' size='sm' onClick={()=>navigate("/admin/pendingblog/"+blog.id)}>view</Button></td>
         </tr>) : <tr className='text-center'><td colSpan={4}>No pending blogs to approve</td></tr> 
        }
        </tbody>
      </Table>
    </div>
  )
}
