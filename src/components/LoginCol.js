import React from "react";

const LoginCol = ({ h4, p, a, href }) => {
  return (
    <div className="col-lg-6">
      <div className="login_box_img">
        <div className="hover">
          <h4>{h4}</h4>
          <p>{p}</p>
          <a className="button button-account" href={href}>
            {a}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginCol;
