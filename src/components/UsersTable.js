import React from "react";
import { NavLink } from "react-router-dom";

const UsersTable = ({ users, addFriend, friendsList, deleteFriend }) => {
  return (
    <section className="row">
      <table className="table table-striped mb-0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Фамилия Имя</th>
            <th scope="col">Email</th>
            <th scope="col">Фото</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="userListTable">
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>
                <NavLink to={`/users/profile_id/${user.id}`}>
                  {user.lastname} {user.name}
                </NavLink>
              </td>
              <td>{user.email}</td>
              <td width="70" height="70" className="user-img-wrapper">
                <img
                  src={
                    user.foto
                      ? `/img/users/${user.id}/${
                          user.foto
                        }?rnd=${Math.random()}`
                      : "/img/users/empty.png"
                  }
                />
              </td>
              <td>
                {!friendsList.some((el) => el == user.id) ? (
                  <button
                    className="btn btn-info"
                    onClick={() => addFriend(user.id)}
                  >
                    Добавить в друзья
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => deleteFriend(user.id)}
                  >
                    Удалить из друзей
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UsersTable;
