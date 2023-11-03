import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import Loader from "../components/UI/loader/Loader";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  console.log(user);

  if (!user.id) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  } else {
    if (!user.id) {
      return (
        <Navigate
          to="/auth"
          state={{ from: location.pathname }}
          replace={true}
        />
      );
    }
    return children;
  }
};

export default RequireAuth;
