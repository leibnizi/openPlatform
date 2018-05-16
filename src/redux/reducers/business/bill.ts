interface BillInfoState {
  bank: string,
  account: string,
  payee: string,
  finance_state: string,
  isEdit: boolean
}

const initBillState: BillInfoState = {
  bank: '',
  account: '',
  payee: '',
  finance_state: '',
  isEdit: true
}

const billInfos = (state: BillInfoState = initBillState, action: any) => {
  switch (action.type) {
    case 'GET_BILL_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    case 'POST_BILL_INFO_SUCCESS':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

export default {
  billInfos
}