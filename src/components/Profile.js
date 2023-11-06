import React, { useRef, useState } from "react";
import PostService from "../API/PostService";
import styles from "./Profile.module.css";
import { useAuth } from "../hook/useAuth";

const Profile = () => {
  const { user, signin } = useAuth();
  const fileAlert = useRef();
  const userAlert = useRef();
  const [edit, setEdit] = useState(false);

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
      if (res.data.id) {
        const userNewFoto = { ...user };
        userNewFoto.foto = res.data.foto;
        signin(userNewFoto);
      } else if (res.data.result == "error")
        fileAlert.current.innerHTML =
          "Не удалось получить данные из базы данных";
      else fileAlert.current.innerHTML = "Ошибка 404. Что-то пошло не так";
    }

    PostService(formData, addFotocb);
  };

  const sendData = function (e) {
    e.preventDefault();
    setEdit(false);
    userAlert.current.innerHTML = "";

    const formData = new FormData(e.target);
    formData.append("id", user.id);
    formData.append("postName", "editUser");

    function editUser(res) {
      if (res.data.id) {
        signin(res.data);
      } else if (res.data.result == "exist")
        userAlert.current.innerHTML = "Этот e-mail занят. Придумайте другой";
      else if (res.data.result == "error")
        userAlert.current.innerHTML =
          "Не удалось получить данные из базы данных";
      else userAlert.current.innerHTML = "Ошибка 404. Что-то пошло не так";
    }

    PostService(formData, editUser);
  };

  return (
    <section className="row mx-4 align-items-end">
      <div className="col-sm-4 mb-5 mb-sm-0">
        <img
          className="mb-4"
          src={
            user.foto
              ? `/img/users/${user.id}/${user.foto}?rnd=${Math.random()}`
              : "/img/users/empty.png"
          }
          width="100%"
        />
        <div className="file">
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .webp"
            className="file_input"
            onChange={(e) => addFoto(e.target)}
          />
          <div className="btn btn-info btn-block file_btn">Измените фото</div>
          <div ref={fileAlert} style={{ color: "red" }}></div>
        </div>
      </div>
      <form className="col-sm-8 pl-sm-5" onSubmit={(e) => sendData(e)}>
        <h3 className="mb-3">O пользователе:</h3>
        <p className={styles.id}>
          <span>Id: </span>
          <span id="userId">{user.id}</span>
        </p>
        <p>
          <span>Имя: </span>
          <span>
            {!edit ? (
              user.name
            ) : (
              <input
                type="text"
                name="name"
                className="form-control"
                defaultValue={user.name}
              ></input>
            )}
          </span>
        </p>
        <p>
          <span>Фамилия: </span>
          <span>
            {!edit ? (
              user.lastname
            ) : (
              <input
                type="text"
                name="lastname"
                className="form-control"
                defaultValue={user.lastname}
              ></input>
            )}
          </span>
        </p>
        <p>
          <span>Email: </span>
          <span>
            {!edit ? (
              user.email
            ) : (
              <input
                type="text"
                name="email"
                className="form-control"
                defaultValue={user.email}
              ></input>
            )}
          </span>
        </p>
        <div ref={userAlert} style={{ color: "red" }}></div>
        {!edit ? (
          <div
            className="btn btn-info btn-block"
            onClick={() => {
              setEdit(true);
              userAlert.current.innerHTML = "";
            }}
          >
            Редактировать данные
          </div>
        ) : (
          <div className="d-flex">
            <button
              className="btn btn-info btn-block mr-2"
              type="submit"
              onClick={() => (userAlert.current.innerHTML = "")}
            >
              Отправить
            </button>
            <div
              className="btn btn-info btn-block mt-0"
              onClick={() => console.log("donlrwork")}
            >
              Отменить
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default Profile;
