import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../pages/Main";
import Contacts from "../pages/Contacts";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RequireAuth from "../hoc/RequireAuth";
import { useAuth } from "../hook/useAuth";
import Header from "./Header";
import Footer from "./Footer";
import { useGetUser } from "../hook/useGetUser";

const AppRouter = () => {
  const { signin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    useGetUser(signin, () => {});
  }, []);

  return (
    <>
      {location.pathname.split("/")[1] !== "users" && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/auth"
          element={
            <RequireAuth>
              <Login />
            </RequireAuth>
          }
        />
        <Route
          path="/users/*"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
      </Routes>
      {location.pathname.split("/")[1] !== "users" && <Footer />}
    </>
  );
};

export default AppRouter;
