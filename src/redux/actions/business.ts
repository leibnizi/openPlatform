export default {
  getBusinessInfos: (token:any) => ({ 
    type: 'GET_BUSINESS_INFO',
    data: token
  }),
  getStatusInfos: (token: any) => ({
    type: 'GET_STATUS_INFO',
    data: token
  }),

  getBillInfos: (token: any) => ({
    type: 'GET_BILL_INFO',
    data: token
  }),  

  editBusinessInfos: (param: any) => ({
    type: 'POST_BUSINESS_INFO',
    data: param
  }),

}