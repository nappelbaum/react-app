import React from "react";
import { NavLink } from "react-router-dom";

const LoginBanner = ({ bannerHeader }) => {
  return (
    <section className="blog-banner-area" id="category">
      <div className="container h-100">
        <div className="blog-banner">
          <div className="text-center">
            <h1>{bannerHeader}</h1>
            <nav aria-label="breadcrumb" className="banner-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {bannerHeader}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginBanner;
