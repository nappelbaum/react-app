import React, { useRef, useState } from "react";
import PostService from "../API/PostService";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const info = useRef();

  const sendForm = function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("postName", "authUser");

    function authUser(res) {
      if (res.data.result == "ok") {
        setShowModal(true);
        setTimeout(() => {
          location.href = "users/profile";
        }, 3000);
      } else if (res.data.result == "no_pass") {
        info.current.innerHTML = "Неправильный пароль";
      } else if (res.data.result == "no_email") {
        info.current.innerHTML = "Пользователь с таким e-mail не найден";
      }
    }

    PostService(formData, authUser);
  };

  const hideInfo = function (e) {
    e.preventDefault();
    info.current.innerHTML = "";
  };

  return (
    <div>
      <section className="blog-banner-area" id="category">
        <div className="container h-100">
          <div className="blog-banner">
            <div className="text-center">
              <h1>Login / Register</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Login/Register
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="login_box_area section-margin">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login_box_img">
                <div className="hover">
                  <h4>Впервые на нашем сайте?</h4>
                  <p>
                    Хотите быть в курсе последних достижений в науке и технике?
                  </p>
                  <a className="button button-account" href="/register">
                    Зарегистрируйтесь
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login_form_inner">
                <h3>Войти в аккаунт</h3>
                <form className="row login_form" onSubmit={sendForm}>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Ваш e-mail"
                      required
                      autoComplete="email"
                      onInput={hideInfo}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="pass"
                      placeholder="Пароль"
                      required
                      onInput={hideInfo}
                    />
                  </div>
                  <p id="info" ref={info}></p>

                  <div className="col-md-12 form-group">
                    <button
                      type="submit"
                      value="submit"
                      className="button button-login w-100"
                    >
                      Войти
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`modal fade${showModal ? " show-modal" : ""}`}
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h5 className="modal-title text-center" id="staticBackdropLabel">
                Вы успешно авторизованы. Поздравляем!
              </h5>
            </div>
            <div className="modal-body text-center">
              В течении нескольких секунд вы будете перенаправлены в личный
              кабинет.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
