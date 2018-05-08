const setpic = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'SET_PIC':
      return Object.assign({}, state, action.data);
    default:
      return state
  }
}

export default {
  setpic
}