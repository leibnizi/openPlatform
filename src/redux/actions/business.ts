export default {
  getBusinessInfos: () => ({ 
    type: 'GET_BUSINESS_INFO',
  }),

  getStatusInfos: () => ({
    type: 'GET_STATUS_INFO',
  }),

  deleteStatus: (id: string) => ({
    type: 'DEIETE_STATUS',
    data: {
      id
    }
  }),

  getBillInfos: () => ({
    type: 'GET_BILL_INFO',
  }),  

  postBillInfos: (param: any) => ({
    type: 'POST_BILL_INFO',
    data: param
  }),  

  getAccountInfos: () => ({
    type: 'GET_ACCOUNT_INFO',
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

  pushBsInfo: () => ({
    type: 'PUSH_BSINFOF',
    data: { pushBsinfo: false }
  }),
}