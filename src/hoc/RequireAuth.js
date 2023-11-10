import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import Loader from "../components/UI/loader/Loader";
import { useGetUser } from "../hook/useGetUser";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user, signin } = useAuth();
  const [go, setGo] = useState(false);
  // console.log(user);

  useEffect(() => {
    useGetUser(signin, () => setGo(true));
  }, []);

  if (!go) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  } else {
    if (location.pathname.split("/")[1] == "users" && !user.id) {
      return <Navigate to="/auth" replace={true} />;
    } else if (location.pathname == "/auth" && user.id) {
      return <Navigate to="/users" replace={true} />;
    }

    return children;
  }
};

export default RequireAuth;
