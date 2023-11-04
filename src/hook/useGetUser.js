import PostService from "../API/PostService";

export function useGetUser(signin, cb) {
  const formData = new FormData();
  formData.append("postName", "getUser");

  function getUser(res) {
    if (res.data.id) signin(res.data);
    cb();
  }
  PostService(formData, getUser);
}
