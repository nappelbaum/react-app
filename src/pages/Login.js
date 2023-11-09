import React, { useRef, useState } from "react";
import PostService from "../API/PostService";
import { useAuth } from "../hook/useAuth";
import LoginBanner from "../components/LoginBanner";
import { NavLink } from "react-router-dom";
import ModalWin from "../components/UI/modal/ModalWin";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const info = useRef();
  const { signin } = useAuth();

  const sendForm = function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("postName", "authUser");

    function authUser(res) {
      if (Object.keys(res.data).length > 1) {
        setShowModal(true);
        setTimeout(() => {
          signin(res.data);
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
      <LoginBanner bannerHeader={"Login / Register"} />

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
                  <NavLink className="button button-account" to={"/register"}>
                    Зарегистрируйтесь
                  </NavLink>
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

      <ModalWin
        showModal={showModal}
        header={"Вы успешно авторизованы. Поздравляем!"}
        caption={
          "В течении нескольких секунд вы будете перенаправлены в личный кабинет."
        }
      />
    </div>
  );
};

export default Login;
