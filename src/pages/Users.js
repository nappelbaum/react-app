import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import UserList from "../components/UserList";
import Friends from "../components/Friends";
import { useAuth } from "../hook/useAuth";
import PostService from "../API/PostService";

const Users = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const logOut = function () {
    const formData = new FormData();
    formData.append("postName", "logOut");

    function logOutcb() {
      signout();
      navigate("/auth", { replace: true });
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
            <NavLink to={"userlist"} className="nav-link">
              Список пользователей
            </NavLink>
            <NavLink to={"friends"} className="nav-link">
              Друзья
            </NavLink>
            <div className="btn btn-info btn-block mt-5" onClick={logOut}>
              Выйти из аккаунта
            </div>
            <NavLink className="btn btn-info btn-block" to={`/`}>
              На главную
            </NavLink>
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
            <Route path="/userlist" element={<UserList />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Users;
