const userInfo = (state: any = {token: 0}, action: any) => {
  switch (action.type) {
    case 'SET_USERINFO':
      console.log('setinfo', action.info.data)
      return {...state, ...action.info.data}
    default:
      return state
  }
}

export default userInfo