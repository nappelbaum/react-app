import PostService from "../API/PostService";

export function useGetUsers(cb) {
  const formData = new FormData();
  formData.append("postName", "getUsers");

  function getUsers(res) {
    if (Object.keys(res.data).length) cb(res);
    else alert("Не удалось получить список пользователей(((");
  }
  PostService(formData, getUsers);
}
