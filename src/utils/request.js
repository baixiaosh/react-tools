import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

const request = ({ url, method, data = {}, headers = {} }) => {
  const option = {
    method: method.toLocaleUpperCase(),
    url: `${url}`,
    [method === 'GET' ? 'params' : 'data']: method === 'GET' ? data : qs.stringify(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers }
  };
  return new Promise((resolve, reject) => {
    if (!navigator.onLine) {
      reject({ message: '网络发生未知错误' });
    }
    axios(option)
      .then(res => {
        if (res.status === 200) {
          return resolve(res.data);
        }
        reject(res);
      })
      .catch(err => {
        reject({ message: '服务器错误，请联系管理员！', err });
      });
  });
};

const fn = type => {
  return (url, data, headers) => request({ url, method: type, data, headers });
};

request.get = fn('GET');
request.post = fn('POST');
request.put = fn('PUT');
request.delete = fn('DELETE');
request.patch = fn('PATCH');

export default request;
