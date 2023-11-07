import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { useAuth } from "../hook/useAuth";
import { useGetUsers } from "../hook/useGetUsers";
import { useAddFriend } from "../hook/useAddFriend";
import Loader from "./UI/loader/Loader";

const Friends = ({ friendsList }) => {
  const [users, setUsers] = useState([]);
  const { user, signin } = useAuth();
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    useGetUsers((res) => {
      const exceptYou = res.data.filter((aUser) => aUser.id !== user.id);
      const friendUsers = exceptYou.filter((aUser) =>
        user.friends.split(",").some((el) => el == aUser.id)
      );
      setUsers(friendUsers);
      setLoader(false);
    });
  }, []);

  return (
    <div className="ml-3">
      {loader && (
        <div className="loader-wrapper-abs">
          <Loader />
        </div>
      )}
      <h2>Список друзей:</h2>
      <UsersTable
        users={users}
        friendsList={friendsList}
        deleteFriend={deleteFriend}
      />
    </div>
  );
};

export default Friends;
