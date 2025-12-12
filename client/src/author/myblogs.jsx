import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../constants/apiurl";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

export const MyBlogs = () => {
  const getToken = JSON.parse(localStorage.getItem("auth"));
  const [loading, setLoading] = useState(false)
  const [data,setData] = useState([])
  const navigate = useNavigate()
  const fetchMyPosts = () => {
    setLoading(true)
    axios
      .get(
        baseurl + "/api/posts/my-posts/",
        {headers: { Authorization: "Bearer " + getToken.token } }
      )
      .then((res) => {setData(res.data); setLoading(false)})
      .catch((err) => {console.log(err); setLoading(false)});
  };
  useEffect(() => {
    fetchMyPosts();
  }, []);
  return <div>
    <h4>My Blogs</h4>
    {loading ? <p>Loading....</p>: data.map(blog=> <Card key={blog.id} className="m-2" onClick={()=>navigate(`/myblog/${blog.id}`)}>
        <p>{blog.title}</p>
        <p>{blog.content}</p>
        <p>Status {blog.status}</p>
    </Card>)}
    </div>;
};
