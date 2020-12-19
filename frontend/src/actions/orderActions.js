import axios from 'axios'

import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS
} from '../constants/orderConstants'

// ORDER CREATE ACTION
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        // Destructure
        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/orders`, order, config)

        // SET USER DATA
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// ORDER DETAIL ACTION
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })

        // Destructure
        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/${id}`, config)

        // SET USER DATA
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}