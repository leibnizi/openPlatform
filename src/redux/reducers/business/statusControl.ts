const statusInfos = (state: any = [], action: any) => {
  switch (action.type) {
    case 'GET_STATUS_SUCCESS':
      return {
        data: [...action.data.list],
        state: action.data.state
      }
    case 'DEIETE_STATUS_SUCCESS':
      const id = action.data.list[0];
      const filterArr = state.filter((item) => {
        return item.id != id
      })
      return filterArr

    case 'ADD_STATUS_SUCCESS':
      return {...state, ...action.data.state, ...{ state:1 } }
    default:
      return state
  }
  
}
// const baseStatusList = (state: any = {}, action: any) => {
//   switch (action.type) {
//     case 'CHEANGE_BASE_STATUS':
//       return action.data
//       // break;
//     default:
//       return state
//   }
// }

const deleteStatusId = (state: string = "", action: any) => {
  switch (action.type) {
    case 'DEIETE_STATUS_SUCCESS':
      return action.data
    default:
      return state
  }
}

export default {
  statusInfos,
  deleteStatusId,
}