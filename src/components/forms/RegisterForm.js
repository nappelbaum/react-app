import React from "react";

const RegisterForm = ({ sendForm, alert }) => {
  return (
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
          <p id="info">{alert}</p>
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
  );
};

export default RegisterForm;
