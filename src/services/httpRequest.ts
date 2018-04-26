import axios, { AxiosPromise } from 'axios';

const urlFix = "http://open-erp.test.msparis.com";

const httpGet = (url: string): AxiosPromise => {
    var url = urlFix + url;
    return axios.get(url);
}

const httpPost = (url: string, queryString: any, body: any): any => {
    var url = urlFix + url;
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


const fetchUtil = (url: string, body: any) => {
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
function checkStatus (res) {
    if (res.status >= 200 && res.status < 300) {
        return res
    }

    const error = new Error(res.statusText)

    console.log(error)
}

//异常处理
function handelData (res) {
    const data = res.data
    if(data.status !== 'ok'){
        if(data.error.code === '11008'){

        }
        else{
            return data
        }
    }
    else{
        return data
    }
}

function handleError (error) {
    return { success: false }
}


//创建axios
const instance = axios.create({
    baseURL: "http://open-erp.test.msparis.com",
    headers:{
        withCredentials: false
    },
    params: {},
    data:{},
    timeout: 50000
});

//发送请求的方法
const request = function (options, params) {
    let access_token = Cookies.getJSON('access_token');
    request.defaults.params = Object.assign({}, request.defaults.params, access_token);
    request.defaults.data = Object.assign({}, request.defaults.data, access_token);

    if(params){
        Object.keys(params).forEach((key) => {
            request.defaults.params[key] = params[key]
            request.defaults.data[key] = params[key]
        })

    }

    return request(options)
        .then(checkStatus)
        .then(handelData)
        .catch(handleError)
}


export {
    httpGet,
    httpPost,
    httpPut,
    httpPatch,
    httpDelete,
    fetchUtil,
    request
}
