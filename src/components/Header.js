import React from "react";
import "../sass/style.scss";
import { useAuth } from "../hook/useAuth";
import logo from "../img/logo.png";
import exitIcon from "../img/svg/exit-up.svg";

const Header = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <header className="header_area">
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand logo_h" href="/">
              <img src={logo} alt="Logo" />
            </a>
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
                  <a className="nav-link" href="/">
                    Home
                  </a>
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
                    Shop
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a className="nav-link" href="/category">
                        Shop Category
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/single-product">
                        Product Details
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/checkout">
                        Product Checkout
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/confirmation">
                        Confirmation
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/cart">
                        Shopping Cart
                      </a>
                    </li>
                  </ul>
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
                    Blog
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a className="nav-link" href="/blog">
                        Blog
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/single-blog">
                        Blog Details
                      </a>
                    </li>
                  </ul>
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
                    Pages
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <a className="nav-link" href="/auth">
                        Вход
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/register">
                        Регистрация
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/tracking-order">
                        Tracking
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
              </ul>

              <ul className="nav-shop">
                <li className="nav-item">
                  <button>
                    <i className="ti-search"></i>
                  </button>
                </li>
                <li className="nav-item">
                  <button>
                    <i className="ti-shopping-cart"></i>
                    <span className="nav-shop__circle">3</span>
                  </button>{" "}
                </li>
                <li className="nav-item">
                  <div>
                    <a className="button button-header" href="/auth">
                      <i className="ti-user fa-user-lc"></i>
                      <span className="ml-3">Личный кабинет</span>
                    </a>
                  </div>
                  <div>
                    <button>
                      <img src={exitIcon}></img>
                    </button>
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
