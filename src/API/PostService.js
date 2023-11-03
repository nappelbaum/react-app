import axios from "axios";

const PostService = (data, callback) => {
  axios.post("https://react.bohohome.ru/php/test.php", data).then((res) => {
    try {
      callback(res);
    } catch (e) {
      alert("Ошибка подключения к базе данных");
    }
  });
};

export default PostService;

// export default class PostService {
//   static postAPI(data) {
//     axios.post("https://react.bohohome.ru/php/test.php", data)
//     .then((res) => {
//         try {

//           } catch (e) {
//             alert("Ошибка подключения к базе данных");
//           }
//     })

//   }
// }