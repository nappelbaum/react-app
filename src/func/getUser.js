import PostService from "../API/PostService";

const getUser = (cb) => {
  const formData = new FormData();
  formData.append("postName", "getUser");

  PostService(formData, cb);
};

export default getUser;
