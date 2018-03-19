import axios from "axios";
const server = function(url, params = null, method = "GET", type = "text/plain; charset=utf-8") {
  return axios({
    url,
    method,
    data: params,
    headers: {
      "Content-Type": type
    },
      responseType: 'json'
  });
};
export default server;
