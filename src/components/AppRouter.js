import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Contacts from "../pages/Contacts";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RequireAuth from "../hoc/RequireAuth";
import { useAuth } from "../hook/useAuth";
import { useGetUser } from "../hook/useGetUser";
import NotFound from "../pages/NotFound";
import Shop from "../pages/Shop";
import Layout from "./Layout";
import { useGetProducts } from "../hook/useGetProducts";
import Header from "./Header";
import Footer from "./Footer";

const AppRouter = () => {
  const { signin } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    useGetUser(signin, () => {});
    useGetProducts(setProducts);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main products={products} />} />
          <Route path="shop" element={<Shop products={products} />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/auth"
          element={
            <RequireAuth>
              <Header />
              <Login />
              <Footer />
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
    </>
  );
};

export default AppRouter;
