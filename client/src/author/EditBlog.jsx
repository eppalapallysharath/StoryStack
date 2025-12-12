import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseurl } from "../constants/apiurl";
import Button from "react-bootstrap/Button";

export const EditBlog = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const getToken = JSON.parse(localStorage.getItem("auth"));
  const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(state?.title);
    const [content, setContent] = useState(state?.content);
    const navigate = useNavigate()
  const fetchblog = async () => {
    try {
      const res = await axios.get(`${baseurl}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${getToken.token}` },
      });
        setTitle(res.data.title)
        setContent(res.data.content)
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (state === null) {
      fetchblog();
      console.log("fetch");
    }
  }, []);

  const updateBlog = async(blogId)=>{

    try {
        const res = await axios.put(`${baseurl}/api/posts/${blogId}/update/`,{title:title, content:content}, {headers:{Authorization:`Bearer ${getToken.token}`}} )
        if(res.status ===200){
            toast.success(res.data.message)
            navigate("/myblogs")
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  return   <form>
      <div>
        <h4>Edit blog </h4>
        <p>Title of blog</p>
        <textarea
          rows={3}
          cols={50}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          minLength={6}
          placeholder="enter title of blog here"
        ></textarea>
      </div>
      <div>
        <p>Content for blog</p>
        <textarea
          rows={10}
          cols={60}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          minLength={20}
          placeholder="start you content from here"
        ></textarea>
      </div>
      <Button size="sm"  onClick={()=>updateBlog(id)} >
        save and update the blog
      </Button>
    </form>;
};
