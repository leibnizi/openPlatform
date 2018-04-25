export default {
  getBusinessInfos: (token:any) => ({ 
    type: 'GET_BUSINESS_INFO',
    data: token
  }),

  getStatusInfos: (token: any) => ({
    type: 'GET_STATUS_INFO',
    data: token
  }),

  deleteStatus: (id: string, token: string) => ({
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

  postBillInfos: (param: any) => ({
    type: 'POST_BILL_INFO',
    data: param
  }),  

  getAccountInfos: (token: any) => ({
    type: 'GET_ACCOUNT_INFO',
    data: token
  }), 
  
  postAccountInfos: (param: any) => ({
    type: 'POST_ACCOUNT_INFO',
    data: param
  }), 
  saveAccountPassword: (param: any) => ({
    type: 'SAVE_ACCOUNT_PASSWPRD',
    data: param
  }), 

  editBusinessInfos: (param: any) => ({
    type: 'POST_BUSINESS_INFO',
    data: param
  }),

}