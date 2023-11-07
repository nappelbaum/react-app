import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useLocation } from "react-router-dom";
import PostService from "../API/PostService";

const ProfileID = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const [userID, setUserID] = useState({});

  useEffect(() => {
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("postName", "getUserID");

    function getUserID(res) {
      if (res.data.id) setUserID(res.data);
    }
    PostService(formData, getUserID);
  }, []);

  return (
    <section className="row mx-4 align-items-end">
      <div className="col-sm-4 mb-5 mb-sm-0">
        <img
          className="mb-4"
          src={
            userID.foto
              ? `/img/users/${userID.id}/${userID.foto}?rnd=${Math.random()}`
              : "/img/users/empty.png"
          }
          width="100%"
        />
      </div>
      <div className="col-sm-8 pl-sm-5 user-edit-form">
        <h3 className="mb-3">O пользователе:</h3>
        <p className={styles.id}>
          <span>Id: </span>
          <span id="userId">{userID.id}</span>
        </p>
        <p>
          <span>Имя: </span>
          <span>{userID.name}</span>
        </p>
        <p>
          <span>Фамилия: </span>
          <span>{userID.lastname}</span>
        </p>
        <p>
          <span>Email: </span>
          <span>{userID.email}</span>
        </p>
      </div>
    </section>
  );
};

export default ProfileID;
