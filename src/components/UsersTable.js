import React from "react";

const UsersTable = ({ users, addFriend, friendsList, deleteFriend }) => {
  return (
    <section className="row">
      <table className="table table-striped">
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
                {user.lastname} {user.name}
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