import React, { useState } from "react";
import PostService from "../API/PostService";
import { useAuth } from "../hook/useAuth";
import LoginBanner from "../components/LoginBanner";
import ModalWin from "../components/UI/modal/ModalWin";
import LoginCol from "../components/LoginCol";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const { signin } = useAuth();
  const [alert, setAlert] = useState("");

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
        setAlert("Неправильный пароль");
      } else if (res.data.result == "no_email") {
        setAlert("Пользователь с таким e-mail не найден");
      }
    }
    PostService(formData, authUser);
  };

  const hideInfo = function (e) {
    e.preventDefault();
    setAlert("");
  };

  return (
    <div>
      <LoginBanner bannerHeader={"Login / Register"} />

      <section className="login_box_area section-margin">
        <div className="container">
          <div className="row">
            <LoginCol
              h4="Впервые на нашем сайте?"
              p="Хотите быть в курсе последних достижений в науке и технике?"
              a="Зарегистрируйтесь"
              href="/register"
            />
            <LoginForm sendForm={sendForm} hideInfo={hideInfo} alert={alert} />
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
