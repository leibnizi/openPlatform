import axios, { AxiosPromise } from 'axios';

const httpGet = (url: string): AxiosPromise => {
  return axios.get(url);
}

const httpPost = (url: string, queryString: any, body: any): any => {
  // 未完待续
  return axios.post(url);
}

const httpPut = (url: string) => {
  // 未完待续
  return null;
}

const httpPatch = () => {
  // 未完待续
  return null;
}

const httpDelete = () => {
  // 未完待续
  return null;
}

const fetchUtil = (url: string, body: any) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    }).then((res:any) => {
        resolve(res)
      })
      .catch((err:any) => {
        reject(err)
      })
  })
}

export {
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
  fetchUtil
}
