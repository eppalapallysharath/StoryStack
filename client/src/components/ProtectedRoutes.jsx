import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../author/HomePage";
import { AdminHomePage } from "../admin/AdminHomePage";
import { PageNotFound } from "../pages/PageNotFound";
import { AuthorNavbar } from "../author/navbar";
import { AdminNavbar } from "../admin/navbar";
export const ProtectedRoutes = ({ user }) => {
  if (user.role === "AUTHOR") {
    return (
      <>
        <AuthorNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
