import axios, { AxiosInstance, AxiosPromise } from 'axios';
import * as Cookies from 'js-cookie';
import { message, Modal } from 'antd';

import { baseUrl } from '../helper/commonUrl'

var is_modal_show = false;
/**
 * heck 请求状态
 * @param res
 * @return {any}
 */

function checkStatus(res: any) {
  if (res.status == 200) {
    if (res.data.status_code == 0) {
      return res
    } else {
      if ((res.data.status_code == 210 || res.data.status_code == 202) && (res.config.url.indexOf('/login') == -1 || res.config.url.indexOf('/register') == -1)) {
        warning(res.data.msg);
        return false;
      } else if (res.config.url.indexOf('/login') == -1 && res.config.url.indexOf('/register') == -1) {
        console.log(res);
        message.error(res.data.msg || '失败');
      }
      return res
    }
  } else {

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
  if (res.status_code != 0) {
    //     if (data.status_code == '11008') {
    // // if (res.statusText !== 'ok') {
    // //     if (data.status_code === '11008') {

    //     }
    //     else {
    //         return data
    //     }
    // message.error(res.msg)
    return data
  }
  else {
    return data
  }
}

function handleError(error: any) {
  return { success: false }
}

/**
 * 警告弹窗
 */
function warning(msg) {
  if (!is_modal_show) {
    is_modal_show = true
    Modal.warning({
      title: '警告',
      content: msg,
      okText: '确定',
      onOk() {
        is_modal_show = false;
        goToLogin()
      },
    });
  }
}

const goToLogin = () => {
  window.location.href = window.location.origin + "/splash"
  Cookies.remove('name')
  Cookies.remove('token')
}

/**
 * 网络错误
 */
function error() {
  if (!is_modal_show) {
    is_modal_show = true
    Modal.error({
      title: '错误',
      content: '网络错误返回登录，请联系系统人员',
      okText: '确定',
      onOk() {
        window.location.href = window.location.origin + "/login";
        is_modal_show = false;
      },
    });
  }
}

/**
 * 创建axios
 */
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    // withCredentials: false
  },
  params: {},
  data: {},
  timeout: 50000
});
const instance2 = axios.create({
  baseURL: baseUrl,
  headers: {
    // withCredentials: false
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {},
  data: {},
  timeout: 50000
});

const enhanceAxiosInstance = (instance: AxiosInstance) => {
  //let token = {}
  var CancelToken = axios.CancelToken;
  var cancel: any

  instance.interceptors.request.use(function (config: any) {
    let token = Cookies.getJSON('token');
    config.params['token'] = token;
    config.data['token'] = token;
    config.cancelToken = new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      cancel = c;
    })
    return config;
  });

  instance.interceptors.response.use(checkStatus);
  instance.interceptors.response.use(handelData);
  return instance
}

//发送请求的方法
const request = enhanceAxiosInstance(instance)
export const easyRequest = enhanceAxiosInstance(instance2)


export default request;
