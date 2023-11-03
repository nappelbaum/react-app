import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "../components/Profile";
import Messages from "../components/Messages";
import Friends from "../components/Friends";

const Users = () => {
  return (
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
            element={<h1>Личный кабинет. Выберите из пунктов слева</h1>}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
    </div>
  );
};

export default Users;
