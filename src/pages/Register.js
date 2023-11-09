import React, { useRef, useState } from "react";
import PostService from "../API/PostService";
import LoginBanner from "../components/LoginBanner";
import ModalWin from "../components/UI/modal/ModalWin";

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const info = useRef();

  const sendForm = function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("postName", "regUser");

    function regUser(res) {
      if (res.data.result == "success") {
        setShowModal(true);
        setTimeout(() => {
          location.href = "auth";
        }, 3000);
      } else if (res.data.result == "exist") {
        info.current.innerHTML = "Пользователь с таким e-mail уже есть";
      }
    }

    PostService(formData, regUser);
  };

  return (
    <div>
      <LoginBanner bannerHeader={"Register"} />

      <section className="login_box_area section-margin">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login_box_img">
                <div className="hover">
                  <h4>Уже зарегистрированы?</h4>
                  <p>Тогда выполните вход на страницу</p>
                  <a className="button button-account" href="/auth">
                    Войти
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login_form_inner register_form_inner">
                <h3>Создание аккаунта</h3>
                <form className="row login_form" onSubmit={sendForm}>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Ваше имя"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      placeholder="Ваша фамилия"
                      required
                      autoComplete="family-name"
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="pass"
                      placeholder="Пароль"
                      required
                    />
                  </div>
                  <p id="info" ref={info}></p>
                  <div className="col-md-12 form-group">
                    <div className="creat_account">
                      <input type="checkbox" required />
                      <label>Согласие на обработку персональных данных</label>
                    </div>
                  </div>
                  <div className="col-md-12 form-group">
                    <button
                      type="submit"
                      value="submit"
                      className="button button-register w-100"
                    >
                      Зарегистрироваться
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
        header={"Вы успешно зарегистрированы. Поздравляем!"}
        caption={
          "В течении нескольких секунд вы будете перенаправлены на страницу авторизации."
        }
      />
    </div>
  );
};

export default Register;
