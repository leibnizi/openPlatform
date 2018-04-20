export default {
  getBusinessInfos: (token:any) => ({ 
    type: 'GET_BUSINESS_INFO',
    data: token
  }),

  getStatusInfos: (token: any) => ({
    type: 'GET_STATUS_INFO',
    data: token
  }),

  deleteStatus: (token: string, id: string) => ({
    type: 'DEIETE_STATUS',
    data: {
      token,
      id
    }
  }),

  getBillInfos: (token: any) => ({
    type: 'GET_BILL_INFO',
    data: token
  }),  

  getAccountInfos: (token: any) => ({
    type: 'GET_ACCOUNT_INFO',
    data: token
  }),  

  editBusinessInfos: (param: any) => ({
    type: 'POST_BUSINESS_INFO',
    data: param
  }),

}