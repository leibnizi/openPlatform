// import default from "src/pages/operation/afterSale/afterSale";


  const validateMail = (rule, value, callback) => {
    if (value && !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      callback('邮箱格式有误！');
    } else {
      callback()
    }
  }
  const validateUsername =  (rule, value, callback) => {
    if (value && !value.test(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/)) {
      callback('用户名格式有误！');
    } else {
      callback()
    }
  }

export {
  validateMail,
  validateUsername
}