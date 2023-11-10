import React from "react";

const LoginForm = ({ sendForm, hideInfo, alert }) => {
  return (
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
          <p id="info">{alert}</p>
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
  );
};

export default LoginForm;
