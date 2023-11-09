import React from "react";
import heroBanner from "../../img/home/hero-banner.png";

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="row no-gutters align-items-center pt-60px">
          <div className="col-5 d-none d-sm-block">
            <div className="hero-banner__img">
              <img className="img-fluid" src={heroBanner} alt="" />
            </div>
          </div>
          <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
            <div className="hero-banner__content">
              <h4>Покупки для удовольствия</h4>
              <h1>Наш магазин заботится о вас</h1>
              <p>
                Зарегистрируйтесь сегодня и получите 1000 бонусных баллов.
                Участвуйте в розыгрыше призов для зарегистрированных
                пользователей.
              </p>
              <a className="button button-hero" href="/register">
                Регистрация
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
