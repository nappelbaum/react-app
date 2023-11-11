import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import UserList from "../components/UserList";
import Friends from "../components/Friends";
import { useAuth } from "../hook/useAuth";
import PostService from "../API/PostService";
import NotFound from "./NotFound";
import heroBanner from "../img/home/hero-banner.png";
import ProfileID from "../components/ProfileID";

const Users = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    setFriendsList(user.friends.split(","));
  }, [user]);

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
    <div className="container mx-auto mt-5 mb-3 users-main">
      <div className="users-back"></div>
      <div className="left-side">
        <div className="img-wrapper">
          <img src={heroBanner} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 mb-5">
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
        <div className="col-lg-9">
          <Routes>
            <Route
              path="/"
              element={
                <h2 style={{ lineHeight: "1.5" }}>
                  Личный кабинет. <br />
                  Привет, {user.name}!
                </h2>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/userlist"
              element={<UserList friendsList={friendsList} />}
            />
            <Route
              path="/friends"
              element={<Friends friendsList={friendsList} />}
            />
            <Route path="/profile_id/*" element={<ProfileID />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Users;
