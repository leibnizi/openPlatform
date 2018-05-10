const statusList = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'SET_STATUS_LIST':
      return action.data
    default:
      return state
  }
}

export default {
  statusList
}