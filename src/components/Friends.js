import React from "react";

const Friends = () => {
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
          <tbody id="userListTable"></tbody>
        </table>
      </section>
    </>
  );
};

export default Friends;
