const userInfo = (state = { token: '' }, action) => {
  switch (action.type) {
    case 'GET_USER_INFOS_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

export default userInfo