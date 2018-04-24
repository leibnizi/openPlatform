interface BillInfoState {
  name: string,
  mobile: string,
  email: string,
  address: string,
  showModal:boolean
}

const initBillState: BillInfoState = {
  name: '',
  mobile: '',
  email: '',
  address: '',
  showModal:false
}

const accountInfos = (state: BillInfoState = initBillState, action: any) => {
  switch (action.type) {
    case 'GET_ACCOUNT_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    case 'POST_ACCOUNT_SUCCESS':
      return Object.assign({edited:true}, state, action.data);
    // case 'TOGGLE_MODAL'

    // // case 'SAVE_ACCOUNT_PASSWORD_SUCCESS':
    // //   return false
    default:
      return state
  }
}



export default {
  accountInfos
}