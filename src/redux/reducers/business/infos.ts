const businessInfos = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'GET_BUSINESS_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      // console.log("New State",newState);
      return newState;
    default:
      return state
  }
}

export default businessInfos