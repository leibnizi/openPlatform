import store from '../store/store'
const business = {
  getBusinessInfo: () => store.dispatch({ type: 'GET_BUSINESS_INFO' }),
}
export default business