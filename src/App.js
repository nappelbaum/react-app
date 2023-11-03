// import { NavLink, Route, Router, Routes } from "react-router-dom";
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

// const Profile = () => {
//   return <h1>Это страница профиля</h1>;
// };
// const Messages = () => {
//   return <h1>Это страница с сообщениями</h1>;
// };
// const Friends = () => {
//   return <h1>Это страница с друзьями</h1>;
// };

// function App() {
//   return (
//     <div className="row">
//       <div className="col-3">
//         <div className="nav flex-column nav-pills">
//           <NavLink to={"profile"} className="nav-link">
//             Профиль
//           </NavLink>
//           <NavLink to={"messages"} className="nav-link">
//             Сообщения
//           </NavLink>
//           <NavLink to={"friends"} className="nav-link">
//             Друзья
//           </NavLink>
//         </div>
//       </div>
//       <div className="col-9">
//         <Routes>
//           <Route
//             path="/"
//             element={<h1>Личный кабинет. Выберите из пунктов слева</h1>}
//           />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/friends" element={<Friends />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

export default App;
