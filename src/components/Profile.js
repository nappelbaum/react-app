import React, { useRef, useState } from "react";
import PostService from "../API/PostService";
import styles from "./Profile.module.css";
import { useAuth } from "../hook/useAuth";
import Loader from "./UI/loader/Loader";
import can from "../img/svg/can.svg";
import DelModal from "./UI/modal/DelModal";

const Profile = () => {
  const { user, signin } = useAuth();
  const fileAlert = useRef();
  const userAlert = useRef();
  const [edit, setEdit] = useState(false);
  const [loaderData, setLoaderData] = useState(false);
  const [loaderImg, setLoaderImg] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);

  const addFoto = function (input) {
    const file = input.files[0];
    fileAlert.current.innerHTML = "";

    if (file) {
      setLoaderImg(true);

      if (file.size > 2 * 1024 * 1024) {
        fileAlert.current.innerHTML = "Файл не должен превышать 2МБ";
        input.value = "";
        setLoaderImg(false);
        return;
      }

      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("foto", file);
      formData.append("postName", "addFoto");

      const addFotocb = function (res) {
        if (res.data.id) {
          const userNewFoto = { ...user };
          userNewFoto.foto = res.data.foto;
          signin(userNewFoto);
        } else if (res.data.result == "error")
          fileAlert.current.innerHTML =
            "Не удалось получить данные из базы данных";
        else if (res.data.result == "errorExt")
          fileAlert.current.innerHTML = "Не допустимый формат файла";
        else fileAlert.current.innerHTML = "Ошибка 404. Что-то пошло не так";

        setLoaderImg(false);
      };

      PostService(formData, addFotocb);
    }
  };

  const delFoto = function () {
    fileAlert.current.innerHTML = "";
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("postName", "delFoto");

    const delFotocb = function (res) {
      if (res.data.result == "ok") {
        const userNewFoto = { ...user };
        userNewFoto.foto = "";
        signin(userNewFoto);
      } else if (res.data.result == "error")
        fileAlert.current.innerHTML = "Не получилось удалить фото";
    };

    PostService(formData, delFotocb);
  };

  const sendData = function (e) {
    e.preventDefault();
    setLoaderData(true);
    userAlert.current.innerHTML = "";

    const formData = new FormData(e.target);
    formData.append("id", user.id);
    formData.append("postName", "editUser");

    function editUser(res) {
      if (res.data.id) {
        signin(res.data);
        setEdit(false);
      } else if (res.data.result == "exist")
        userAlert.current.innerHTML = "Этот e-mail занят. Придумайте другой";
      else if (res.data.result == "error")
        userAlert.current.innerHTML =
          "Не удалось получить данные из базы данных";
      else userAlert.current.innerHTML = "Ошибка 404. Что-то пошло не так";

      setLoaderData(false);
    }

    PostService(formData, editUser);
  };

  return (
    <section className="row mx-4 align-items-end">
      <div className="col-sm-4 mb-5 mb-sm-0">
        {loaderImg && (
          <div className="loader-wrapper-abs">
            <Loader />
          </div>
        )}
        <img
          className="mb-4"
          src={
            user.foto
              ? `/img/users/${user.id}/${user.foto}?rnd=${Math.random()}`
              : "/img/users/empty.png"
          }
          width="100%"
        />
        <div className="d-flex align-items-center">
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
          {user.foto && (
            <div
              className="d-flex align-items-center ml-3"
              role="button"
              title="Удалить фото"
              onClick={() => setDelModalOpen(true)}
            >
              <img src={can}></img>
            </div>
          )}
        </div>
      </div>
      <form
        className="col-sm-8 pl-sm-5 user-edit-form"
        onSubmit={(e) => sendData(e)}
      >
        {loaderData && (
          <div className="loader-wrapper-abs">
            <Loader />
          </div>
        )}
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
                autoComplete="name"
                required
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
                autoComplete="family-name"
                required
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
                autoComplete="email"
                required
              ></input>
            )}
          </span>
        </p>
        <div ref={userAlert} style={{ color: "red" }}></div>
        {!edit ? (
          <div className="btn btn-info btn-block" onClick={() => setEdit(true)}>
            Редактировать данные
          </div>
        ) : (
          <div className="d-flex">
            <button className="btn btn-info btn-block mr-2" type="submit">
              Отправить
            </button>
            <div
              className="btn btn-info btn-block mt-0"
              onClick={() => {
                setEdit(false);
                userAlert.current.innerHTML = "";
              }}
            >
              Отменить
            </div>
          </div>
        )}
      </form>
      <DelModal
        delModalOpen={delModalOpen}
        setDelModalOpen={setDelModalOpen}
        performFunc={delFoto}
        question="Подтвердите удаление фото"
        performBtn="Удалить"
      />
    </section>
  );
};

export default Profile;
