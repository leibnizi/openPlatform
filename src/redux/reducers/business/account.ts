interface BillInfoState {
  name: string,
  mobile: string,
  email: string,
  address: string
}

const initBillState: BillInfoState = {
  name: '',
  mobile: '',
  email: '',
  address: ''
}

const accountInfos = (state: BillInfoState = initBillState, action: any) => {
  switch (action.type) {
    case 'GET_ACCOUNT_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

export default accountInfos