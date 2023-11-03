import React from "react";
import PostService from "../API/PostService";

const Profile = () => {
  const logOut = function () {
    const formData = new FormData();
    formData.append("postName", "logOut");

    function logOutcb() {
      location.href = location.protocol + "//" + location.host + "/auth";
    }

    PostService(formData, logOutcb);
  };

  return (
    <div>
      <h1>Это страница профиля</h1>
      <div className="btn btn-info btn-block" onClick={logOut}>
        Выйти из аккаунта
      </div>
    </div>
  );
};

export default Profile;
