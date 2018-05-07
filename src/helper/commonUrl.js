var baseUrl = ''

if (process.env.NODE_ENV === 'test') {
  baseUrl = "http://open-erp.test.msparis.com"  
}
else if (process.env.NODE_ENV === 'develop'){
  baseUrl = "http://open-erp.test.msparis.com"  
}
else if (process.env.NODE_ENV === 'production') {
  baseUrl = "http://open-erp.test.msparis.com"
}

module.exports = {
  baseUrl
};