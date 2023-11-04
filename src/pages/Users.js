import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import Messages from "../components/Messages";
import Friends from "../components/Friends";
import { useAuth } from "../hook/useAuth";
import PostService from "../API/PostService";

const Users = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logOut = function () {
    const formData = new FormData();
    formData.append("postName", "logOut");

    function logOutcb() {
      navigate("/auth", { replace: true });
      // location.href = location.protocol + "//" + location.host + "/auth";
    }
    PostService(formData, logOutcb);
  };

  return (
    <div className="container mx-auto my-5">
      <div className="row">
        <div className="col-md-3 mb-5">
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
            <div className="btn btn-info btn-block mt-5" onClick={logOut}>
              Выйти из аккаунта
            </div>
          </div>
        </div>
        <div className="col-md-9">
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
