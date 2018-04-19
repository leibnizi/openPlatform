const businessInfo = (state: any = {}, action: any) => {
  // debugger
  switch (action.type) {
    case 'GET_BUSINESS_SUCCESS':
    // debugger
      console.log(action.data.data.data,"SSS")
      const newState = Object.assign({}, state, {
        businessInfo: action.data.data.data
      });
      console.log("New State",newState);
      return newState;
    default:
      return state
  }
}

export default businessInfo