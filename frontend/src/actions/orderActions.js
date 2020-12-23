import axios from 'axios'

import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS
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

// PAYING ORDER
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        // Destructure
        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'Application/JSON',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        // SET USER DATA
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// GET MY ORDER 
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: ORDER_LIST_MY_REQUEST
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

        const {data} = await axios.get(`/api/orders/myorders`, config)

        // SET USER DATA
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}