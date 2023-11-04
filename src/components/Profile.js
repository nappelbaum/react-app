import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const fileAlert = useRef();
  const [fotoSrc, setFotoSrc] = useState();

  useEffect(() => {
    user.foto
      ? setFotoSrc(`/img/users/${user.id}/${user.foto}`)
      : setFotoSrc("/img/users/empty.png");
  }, []);

  const addFoto = function (input) {
    const file = input.files[0];
    fileAlert.current.innerHTML = "";

    if (file.size > 2 * 1024 * 1024) {
      fileAlert.current.innerHTML = "Файл не должен превышать 2МБ";
      input.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("foto", file);
    formData.append("postName", "addFoto");

    function addFotocb(res) {
      if (Object.keys(res.data).length > 1)
        setFotoSrc(
          `/img/users/${res.data.id}/${res.data.foto}?rnd=${Math.random()}`
        );
      else if (res.data.result == "error")
        fileAlert.current.innerHTML =
          "Не удалось получить данные из базы данных";
      else fileAlert.current.innerHTML = "Что-то пошло не так";
    }

    PostService(formData, addFotocb);
  };

  return (
    <section className="row mx-4 align-items-end">
      <div className="col-sm-4 mb-5 mb-sm-0">
        <img className="mb-4" src={fotoSrc} width="100%" />
        <div className="file">
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .webp"
            className="file_input"
            onChange={(e) => addFoto(e.target)}
          />
          <div className="btn btn-info btn-block file_btn">Измените фото</div>
          <div
            ref={fileAlert}
            style={{ color: "red", paddingLeft: "0.75rem" }}
          ></div>
        </div>
      </div>
      <div className="col-sm-8 pl-5">
        <h3 className="mb-3">O пользователе:</h3>
        <p className={styles.id}>
          Id: <span id="userId">{user.id}</span>
        </p>
        <p>
          Имя и фамилия:{" "}
          <span id="userName">
            {user.name} {user.lastname}
          </span>
        </p>
        <p>
          Email: <span id="userEmail">{user.email}</span>
        </p>
        <div className="w-50">
          <NavLink className="btn btn-info btn-block" to={`/`}>
            На главную
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Profile;
