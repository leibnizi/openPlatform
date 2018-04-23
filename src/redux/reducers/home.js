const userInfo = (state = { token: '19$$b5fbab2e48ad5a0470ef8a351f9b6aa9' }, action) => {
  switch (action.type) {
    case 'GET_USER_INFOS_SUCCESS':
      const newState = Object.assign({}, state, action.data);
      return newState;
    default:
      return state
  }
}

export default userInfo