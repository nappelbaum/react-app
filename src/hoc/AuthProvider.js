import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    foto: "",
    friends: "",
  });

  const signin = (newUser) => {
    setUser(newUser);
  };
  const signout = () => {
    setUser({ id: "", name: "", lastname: "", email: "", foto: "" });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
