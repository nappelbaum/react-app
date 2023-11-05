import React, { useEffect, useState } from "react";
import { useGetUsers } from "../hook/useGetUsers";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    useGetUsers((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <h2>Список друзей:</h2>
      <section className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Фамилия Имя</th>
              <th scope="col">Email</th>
              <th scope="col">Фото</th>
            </tr>
          </thead>
          <tbody id="userListTable">
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>
                  {user.lastname} {user.name}
                </td>
                <td>{user.email}</td>
                <td>
                  <img
                    className="m-3"
                    height="100px"
                    src={
                      user.foto
                        ? `/img/users/${user.id}/${
                            user.foto
                          }?rnd=${Math.random()}`
                        : "/img/users/empty.png"
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default UserList;
