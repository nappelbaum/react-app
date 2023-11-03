import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    foto: "",
  });

  const signin = (newUser) => {
    setUser(newUser);
  };
  const signout = () => {
    setTimeout(() => {
      setUser({ id: "", name: "", lastname: "", email: "", foto: "" });
    }, 1000);
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
