import React, { useEffect, useState } from "react";
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
import NotFound from "../pages/NotFound";
import Shop from "../pages/Shop";
import axios from "axios";

const AppRouter = () => {
  const { signin } = useAuth();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    useGetUser(signin, () => {});

    axios("https://bohohome.ru/php/getshop.php").then((res) => {
      const newData = res.data.map((item) => {
        item[2] = item[2].split(",")[0];
        return item;
      });
      setProducts(newData);
    });
  }, []);

  return (
    <>
      {location.pathname.split("/")[1] !== "users" && <Header />}
      <Routes>
        <Route path="/" element={<Main products={products} />} />
        <Route path="/shop" element={<Shop products={products} />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname.split("/")[1] !== "users" && <Footer />}
    </>
  );
};

export default AppRouter;
