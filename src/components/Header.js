import React from "react";
import "../sass/style.scss";
import { useAuth } from "../hook/useAuth";
import logo from "../img/logo.png";
import userIcon from "../img/svg/user.svg";
import exitIcon from "../img/svg/exit-up.svg";
import searchIcon from "../img/svg/search.svg";
import cartIcon from "../img/svg/shopping-cart.svg";
import { NavLink, useNavigate } from "react-router-dom";
import PostService from "../API/PostService";

const Header = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const logOut = function () {
    const formData = new FormData();
    formData.append("postName", "logOut");

    function logOutcb() {
      signout();
      navigate("/auth", { replace: true });
    }
    PostService(formData, logOutcb);
  };

  return (
    <header className="header_area">
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <NavLink className="navbar-brand logo_h" to={"/"}>
              <img src={logo} alt="Logo" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div
              className="collapse navbar-collapse offset"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item submenu dropdown">
                  <NavLink to={"/shop"} className="nav-link dropdown-toggle">
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item submenu dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Login
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/auth"}>
                        {user.id ? "Личный кабинет" : "Вход"}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/register"}>
                        Регистрация
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/contact"}>
                    Contact
                  </NavLink>
                </li>
              </ul>

              <ul className="nav-shop">
                <li className="nav-item">
                  <button>
                    <img src={searchIcon}></img>
                  </button>
                </li>
                <li className="nav-item">
                  <button>
                    <img src={cartIcon}></img>
                    <span className="nav-shop__circle">3</span>
                  </button>{" "}
                </li>
                <li className="nav-item">
                  <div>
                    <a
                      className="button button-header d-flex align-items-center"
                      href="/auth"
                      title={`${user.name} ${user.lastname}`}
                    >
                      {user.id && <img src={userIcon} className="mr-3"></img>}
                      <span>{user.id ? "Личный кабинет" : "Вход"}</span>
                    </a>
                  </div>
                  <div>
                    {user.id && (
                      <button onClick={logOut}>
                        <img src={exitIcon} title="Выход из аккаунта"></img>
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
