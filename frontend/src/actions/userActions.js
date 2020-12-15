import axios from 'axios'

// DEPENDENCIES
import { 
    USER_DETAIL_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants"

// LOGIN ACTION
export const login = (email, password) => async (dispatch) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        }

        const {data} = await axios.post('/api/users/login', {email, password}, config)

        // SET USER DATA
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // STORE USER DATA TO LOCALSTORAGE
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// LOGOUT ACTION
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}

// REGISTER ACTION
export const register = (name, email, password) => async (dispatch) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        }

        const {data} = await axios.post('/api/users', {name, email, password}, config)

        // SET USER DATA
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        
        // SET USER LOGIN AFTER REGISTER
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // STORE USER DATA TO LOCALSTORAGE
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// USER DETAIL ACTION
export const getUserDetail = (id) => async (dispatch, getState) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: USER_DETAIL_REQUEST
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

        const {data} = await axios.get(`/api/users/${id}`, config)

        // SET USER DATA
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}

// USER DETAIL ACTION
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        // GET USER DATA FROM DB
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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

        const {data} = await axios.put(`/api/users/profile`, user, config)

        // SET USER DATA
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response 
                    && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}