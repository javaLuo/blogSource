import axios from "axios";

/**
 *
 * @param url 请求路径
 * @param params 请求参数
 * @param method 请求方式
 * @param type 是否不加responseType(.md文件请求需要设置为true,否则解析不了)
 * @returns {AxiosPromise}
 */
const server = function(url, params = null, method = "GET", type = false) {
  const req = {
    url,
    method,
    data: params,
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    },
    responseType: "json"
  };
  if (type) {
    delete req.responseType;
  }
  return axios(req);
};
export default server;
