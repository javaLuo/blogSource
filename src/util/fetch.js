import axios from 'axios';
const server = function(url, params = null, method = 'GET') {
    return axios({
        url,
        method,
        data: params,
        headers: {
            "Content-Type": "text/plain; charset=utf-8"
        },
    });
};
export default server;