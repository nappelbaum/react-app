import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { useAuth } from "../hook/useAuth";
import { useGetUsers } from "../hook/useGetUsers";
import { useAddFriend } from "../hook/useAddFriend";

const Friends = ({ friendsList }) => {
  const [users, setUsers] = useState([]);
  const { user, signin } = useAuth();

  const deleteFriend = function (delFriendId) {
    let promise = new Promise((resolve) => {
      const userNewFriend = { ...user };
      userNewFriend.friends = { ...user }.friends
        .split(",")
        .filter((el) => el !== delFriendId)
        .join(",");
      useAddFriend(user, userNewFriend, signin);
      resolve();
    });

    promise.then(() => {
      const newUsersList = users.filter((aUser) => aUser.id !== delFriendId);
      setUsers(newUsersList);
    });
  };

  useEffect(() => {
    useGetUsers((res) => {
      const exceptYou = res.data.filter((aUser) => aUser.id !== user.id);
      const friendUsers = exceptYou.filter((aUser) =>
        user.friends.split(",").some((el) => el == aUser.id)
      );
      setUsers(friendUsers);
    });
  }, []);

  return (
    <>
      <h2>Список друзей:</h2>
      <UsersTable
        users={users}
        friendsList={friendsList}
        deleteFriend={deleteFriend}
      />
    </>
  );
};

export default Friends;
