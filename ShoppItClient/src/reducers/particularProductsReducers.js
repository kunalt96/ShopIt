import {
  PRODUCT_BYID_FAIL,
  PRODUCT_BYID_REQUEST,
  PRODUCT_BYID_SUCCESS,
} from '../constants/productConstants'

export const productReducer = (
  state = { product: null, loading: true },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_BYID_REQUEST:
      return { loading: true, product: null }
    case PRODUCT_BYID_SUCCESS:
      return { loading: false, product: payload }
    case PRODUCT_BYID_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
