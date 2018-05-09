// import default from "src/pages/operation/afterSale/afterSale";


  const validateMail = (rule, value, callback) => {
    if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      callback('邮箱格式有误！');
    } else {
      callback()
    }
  }
  const validateUsername =  (rule, value, callback) => {
    if (value && !(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value))) {
      callback('用户名格式有误！');
    } else {
      callback()
    }
  }

  const validateMobile = (rule, value, callback) => {
    if (value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
      callback('手机格式有误！');
    } else {
      callback()
    }
  }

  // const validateUrl = (rule, value, callback) => {
  //   if (value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
  //     callback('手机格式有误！');
  //   } else {
  //     callback()
  //   }
  // }
export {
  validateMail,
  validateMobile,
  validateUsername
}