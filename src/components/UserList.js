import React, { useEffect, useState } from "react";
import { useGetUsers } from "../hook/useGetUsers";
import { useAuth } from "../hook/useAuth";
import UsersTable from "./UsersTable";
import { useAddFriend } from "../hook/useAddFriend";

const UserList = ({ friendsList }) => {
  const [users, setUsers] = useState([]);
  const { user, signin } = useAuth();

  const addFriend = function (newFriendId) {
    const userNewFriend = { ...user };
    userNewFriend.friends += !userNewFriend.friends
      ? newFriendId
      : `,${newFriendId}`;

    useAddFriend(user, userNewFriend, signin);
  };

  const deleteFriend = function (delFriendId) {
    const userNewFriend = { ...user };
    userNewFriend.friends = { ...user }.friends
      .split(",")
      .filter((el) => el !== delFriendId)
      .join(",");
    useAddFriend(user, userNewFriend, signin);
  };

  useEffect(() => {
    useGetUsers((res) => {
      const exceptYou = res.data.filter((aUser) => aUser.id !== user.id);
      setUsers(exceptYou);
    });
  }, []);

  return (
    <>
      <h2>Список пользователей:</h2>
      <UsersTable
        users={users}
        addFriend={addFriend}
        friendsList={friendsList}
        deleteFriend={deleteFriend}
      />
    </>
  );
};

export default UserList;
