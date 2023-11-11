import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const UsersTable = ({ users, addFriend, friendsList, deleteFriend }) => {
  const { user } = useAuth();

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
          {users.map((userId, index) => (
            <tr key={userId.id}>
              <th scope="row">{index + 1}</th>
              <td>
                <NavLink
                  to={`/users/profile_id/${userId.id}`}
                  className="userId-name"
                >
                  {userId.lastname} {userId.name}
                  {userId.friends.split(",").some((el) => el == user.id) && (
                    <div>Вы в списке друзей этого пользователя</div>
                  )}
                </NavLink>
              </td>
              <td>{userId.email}</td>
              <td width="70" height="70" className="user-img-wrapper">
                <img
                  src={
                    userId.foto
                      ? `/img/users/${userId.id}/${
                          userId.foto
                        }?rnd=${Math.random()}`
                      : "/img/users/empty.png"
                  }
                />
              </td>
              <td>
                {!friendsList.some((el) => el == userId.id) ? (
                  <button
                    className="btn btn-info"
                    onClick={() => addFriend(userId.id)}
                  >
                    Добавить в друзья
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => deleteFriend(userId.id)}
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
