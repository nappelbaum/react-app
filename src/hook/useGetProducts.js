import axios from "axios";

export function useGetProducts(cb) {
  axios("https://bohohome.ru/php/getshop.php").then((res) => {
    const newData = res.data.map((item) => {
      item[2] = item[2].split(",")[0];
      item[1] = item[1].split(",").slice(0, -1).join(", ");
      return item;
    });
    cb(newData);
  });
}
