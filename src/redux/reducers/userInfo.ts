const userInfo = (state: any = { token: '19$$b5fbab2e48ad5a0470ef8a351f9b6aa9' }, action: any) => {
  switch (action.type) {
    case 'SET_USERINFO':
      console.log('setinfo', action.info.data)
      return { ...state, ...action.info.data }
    default:
      return state
  }
}

export default userInfo