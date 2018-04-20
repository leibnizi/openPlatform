const statusInfos = (state: any = [], action: any) => {
  switch (action.type) {
    case 'GET_STATUS_SUCCESS':
      return [...state, ...action.data]
    default:
      return state
  }
}

const deleteStatus = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'DEIETE_STATUS_SUCCESS':
    default:
      return state
  }
}

export default {
  statusInfos,
  deleteStatus
}