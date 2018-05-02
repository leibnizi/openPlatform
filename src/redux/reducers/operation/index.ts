const statusList = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'SET_STATUS_LIST':
      return Object.assign({}, state, action.data);
    default:
      return state
  }
}

export default {
  statusList
}