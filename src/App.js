import React from "react";
import AppRouter from "./components/AppRouter";
import { AuthProvider } from "./hoc/AuthProvider";
// import PostService from "./API/PostService";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
