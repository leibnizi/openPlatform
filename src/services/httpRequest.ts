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

const request = axios.create({
    baseURL: "http://open-erp.test.msparis.com",
    timeout: 50000
});

export {
    httpGet,
    httpPost,
    httpPut,
    httpPatch,
    httpDelete,
    fetchUtil,
    request
}
