import axios from 'axios'
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_BYID_FAIL,
  PRODUCT_BYID_SUCCESS,
  PRODUCT_BYID_REQUEST,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_BYID_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: PRODUCT_BYID_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: PRODUCT_BYID_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
