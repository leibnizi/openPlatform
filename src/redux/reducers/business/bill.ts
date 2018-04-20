interface BillInfoState {
  bank:string,
  account:string,
  payee:string,
  finance_state:string
}

const initBillState: BillInfoState  = {
  bank:'',
  account:'',
  payee:'',
  finance_state:''
}

const billInfos = (state: BillInfoState = initBillState, action: any) => {
  switch (action.type) {
    case 'GET_BILL_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

export default billInfos