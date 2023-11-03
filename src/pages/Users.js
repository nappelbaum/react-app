import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "../components/Profile";
import Messages from "../components/Messages";
import Friends from "../components/Friends";
import { useAuth } from "../hook/useAuth";

const Users = () => {
  const { user } = useAuth();

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-3">
          <div className="nav flex-column nav-pills">
            <NavLink to={"profile"} className="nav-link">
              Профиль
            </NavLink>
            <NavLink to={"messages"} className="nav-link">
              Сообщения
            </NavLink>
            <NavLink to={"friends"} className="nav-link">
              Друзья
            </NavLink>
          </div>
        </div>
        <div className="col-9">
          <Routes>
            <Route
              path="/"
              element={
                <h2>
                  Личный кабинет. Привет, {user.name}! Выберите один из пунктов
                  слева.
                </h2>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Users;
