import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { baseurl } from "../constants/apiurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Writeblog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const getToken = JSON.parse(localStorage.getItem("auth"));
    const navigate = useNavigate() 
  const createPost = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseurl}/api/posts/`,
        { title: title, content: content },
        { headers: { Authorization: "Bearer " + getToken.token } }
      )
      .then((res) =>{ toast.success(res.data.message);  navigate("/myblogs")})
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          toast.error(JSON.stringify(err.response.data));
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <form>
      <div>
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
      <Button size="sm" onClick={createPost}>
        Create blog
      </Button>
    </form>
  );
};
