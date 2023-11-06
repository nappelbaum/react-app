import PostService from "../API/PostService";

export function useAddFriend(user, userNewFriend, signin) {
  const formData = new FormData();
  formData.append("id", user.id);
  formData.append("friends", userNewFriend.friends);
  formData.append("postName", "addFriend");

  function addFriendcb(res) {
    if (res.data.result == "ok") {
      signin(userNewFriend);
    } else alert("Ошибка 404. Что-то пошло не так");
  }

  PostService(formData, addFriendcb);
}
