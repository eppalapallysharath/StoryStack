import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../author/HomePage";
import { AdminHomePage } from "../admin/AdminHomePage";
import { PageNotFound } from "../pages/PageNotFound";
import { AuthorNavbar } from "../author/navbar";
import { AdminNavbar } from "../admin/navbar";
import { Blog } from "./blog";
import { Writeblog } from "../author/writeblog";
import { MyBlogs } from "../author/myblogs";
import { MyBlog } from "../author/myblog";
export const ProtectedRoutes = ({ user }) => {
  if (user.role === "AUTHOR") {
    return (
      <>
        <AuthorNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<Blog/>} />
          <Route path="/writeblog" element={<Writeblog/>} />
          <Route path="/myblogs" element = {<MyBlogs/>} />
          <Route path="/myblog/:id" element = {<MyBlog/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    );
  } else if (user.role === "ADMIN") {
    return (
      <>
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    );
  }
};
