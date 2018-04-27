import axios, {AxiosInstance, AxiosPromise} from 'axios';
import * as Cookies from 'js-cookie';
import { message, Modal } from 'antd';

var is_message_show = true;
/**
 * heck 请求状态
 * @param res
 * @return {any}
 */

function checkStatus(res: any) {
    if(res.status == 200){
        if (res.data.status_code == 0) {
            return res
        }else {
            if(res.data.status_code == 210 || res.data.status_code == 202){
                warning();
                return false;
            }else if(is_message_show){
                console.log(res);
                message.error(res.data.msg || '失败',1);
                is_message_show = false;
            }
            return res
        }
    }else {
        error();
        return false;
    }
}

/**
 * 异常处理
 * @param res
 * @return {any}
 */
function handelData(res: any) {
    const data = res.data
    if (data.status_code != 0) {
        if (data.status_code == '11008') {
    // if (res.statusText !== 'ok') {
    //     if (data.status_code === '11008') {

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

/**
 * 警告弹窗
 */
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

/**
 * 网络错误
 */
function error() {
    Modal.error({
        title: '错误',
        content: '网络错误返回登录，请联系系统人员',
        okText:'确定',
        onOk() {
            window.location.href =  window.location.origin+ "/login";
        },
    });
}

/**
 * 创建axios
 */
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
    // let token = {
    //     token: '19$$b5fbab2e48ad5a0470ef8a351f9b6aa9'
    // } ;
    //let token = {}
    

    instance.interceptors.request.use(function (config:any) {
        let token = Cookies.getJSON('token');
        config.params['token'] = token;
        config.data['token'] = token;
        console.log(config, 1212);
        console.log(instance.defaults.params,123);
        return config;
    });

    instance.interceptors.response.use(checkStatus);
    instance.interceptors.response.use(handelData);
    //instance.interceptors.response.use(handleError);
    return instance
}

//发送请求的方法
const request = enhanceAxiosInstance(instance)


export default request;
