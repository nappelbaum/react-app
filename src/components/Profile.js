import React, { useRef, useState } from "react";
import PostService from "../API/PostService";
import styles from "./Profile.module.css";
import { useAuth } from "../hook/useAuth";

const Profile = () => {
  const { user, signin } = useAuth();
  const fileAlert = useRef();
  const [edit, setEdit] = useState(false);
  // const name = useRef();
  // const lastname = useRef();
  // const email = useRef();

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
      if (Object.keys(res.data).length > 1) {
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

  const editData = function () {
    setEdit(true);
  };

  const sendData = function (e) {
    e.preventDefault();
    setEdit(false);
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
          <div
            ref={fileAlert}
            style={{ color: "red", paddingLeft: "0.75rem" }}
          ></div>
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
                className="form-control"
                defaultValue={user.email}
              ></input>
            )}
          </span>
        </p>
        {!edit ? (
          <div className="btn btn-info btn-block" onClick={editData}>
            Редактировать данные
          </div>
        ) : (
          <div className="d-flex">
            <button className="btn btn-info btn-block mr-2" type="submit">
              Отправить
            </button>
            <div className="btn btn-info btn-block mt-0" onClick={editData}>
              Отменить
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default Profile;
