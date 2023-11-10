import React, { useState } from "react";
import PostService from "../API/PostService";
import LoginBanner from "../components/LoginBanner";
import ModalWin from "../components/UI/modal/ModalWin";
import LoginCol from "../components/LoginCol";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState("");

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
        setAlert("Пользователь с таким e-mail уже есть");
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
            <LoginCol
              h4="Уже зарегистрированы?"
              p="Тогда выполните вход на страницу"
              a="Войти"
              href="/auth"
            />
            <RegisterForm sendForm={sendForm} alert={alert} />
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
