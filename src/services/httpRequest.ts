import axios, {AxiosInstance, AxiosPromise} from 'axios';
import * as Cookies from 'js-cookie';

const urlFix = "http://open-erp.test.msparis.com";

export const httpGet = (url: string): AxiosPromise => {
    var url = urlFix + url;
    return axios.get(url);
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
    if (res.status >= 200 && res.status < 300) {
        return res
    }

    const error = new Error(res.statusText)

    console.log(error)
}

//异常处理
function handelData(res: any) {
    const data = res.data
    if (data.status !== 'ok') {
        if (data.error.code === '11008') {

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


//创建axios
const instance = axios.create({
    baseURL: "http://open-erp.test.msparis.com",
    headers: {
        withCredentials: false
    },
    params: {},
    data: {},
    timeout: 50000
});

const enhanceAxiosInstance = (instance: AxiosInstance) => {
    let access_token = Cookies.getJSON('access_token');
    instance.defaults.params = Object.assign({}, instance.defaults.params, access_token);
    instance.defaults.data = Object.assign({}, instance.defaults.data, access_token);

    return instance
}

//发送请求的方法
const request = enhanceAxiosInstance(instance)


export default request;