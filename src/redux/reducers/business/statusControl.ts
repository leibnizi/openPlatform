const statusInfos = (state: any = [], action: any) => {
  switch (action.type) {
    case 'GET_STATUS_SUCCESS':
      // console.log(action.data,"????")
      return action.data
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

const deleteStatus = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'DEIETE_STATUS_SUCCESS':
    default:
      return state
  }
}

export default {
  statusInfos,
  deleteStatus,
}