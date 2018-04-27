import axios, {AxiosInstance, AxiosPromise} from 'axios';
import * as Cookies from 'js-cookie';
import { message, Modal } from 'antd';

const urlFix = "http://open-erp.test.msparis.com"

export const httpGet = (url: string): AxiosPromise => {
    var urlx = urlFix + url;
    return axios.get(url)
}

export const httpPost = (url: string, queryString: any, body: any): any => {
    var url = urlFix + url;
    return axios.post(url);
}

export const httpPut = (url: string) => {
    // 未完待续
    return null;
}

export const httpPatch = () => {
    // 未完待续
    return null;
}

export const httpDelete = () => {
    // 未完待续
    return null;
}

const _fetch = (requestPromise: any, timeout = 30000) => {
  let timeoutAction: any = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject('请求超时');
    }
  })
  setTimeout(() => {
    timeoutAction()
  }, timeout)
  return Promise.race([requestPromise, timerPromise]);
}


export const fetchUtil = (url: string, body: any) => {
    var url = urlFix + url;
    const jsonBody = JSON.stringify(body)
    const myFetch = fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Access-Control-Request-Method': 'POST',
        },
        mode: 'cors',
        body: jsonBody,
    })
    return new Promise((resolve, reject) => {
        _fetch(myFetch, 30000)
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                resolve(responseData)
            })
            .catch(error => {
                console.log('error', error)
                reject(error);
            });
    });
}

//check 请求状态
function checkStatus(res: any) {
    if (res.statusText == 'OK') {
        return res
    }else {
        if(res.status_code == 210 || res.status_code == 202){
            warning();
        }else {
            console.log(res);
            message.error(res.data.msg || '失败',1);
        }
        return res
    }
}

//异常处理
function handelData(res: any) {
    const data = res.data
    if (res.statusText !== 'ok') {
        if (data.status_code === '11008') {

        }
        else {
            return data
        }
    }
    else {
        return data
    }
}

function handleError(error: any) {
    return {success: false}
}
//警告弹窗
function warning() {
    Modal.warning({
        title: '警告',
        content: '登录超时，请重新登录!',
        okText:'确定',
        onOk() {
            window.location.href =  window.location.origin+ "/login";
        },
    });
}

//创建axios
const instance = axios.create({
    baseURL: "http://open-erp.test.msparis.com",
    headers: {
       // withCredentials: false
    },
    params: {},
    data: {},
    timeout: 50000
});

const enhanceAxiosInstance = (instance: AxiosInstance) => {
    let token = Cookies.getJSON('token');
    instance.defaults.params = Object.assign({}, instance.defaults.params, token);
    instance.defaults.data = Object.assign({}, instance.defaults.data, token);

    instance.interceptors.response.use(checkStatus);
    instance.interceptors.response.use(handelData);
    //instance.interceptors.response.use(handleError);
    return instance
}

//发送请求的方法
const request = enhanceAxiosInstance(instance)


export default request;