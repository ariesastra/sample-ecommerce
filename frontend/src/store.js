import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// other dependencies
import { 
        productListReducer, 
        productDetailReducer,
        productDeleteReducer,
        productCreateReducer,
        productUpdateReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
        userDetailReducer, 
        userLoginReducer, 
        userRegisterReducer,
        userUpdateProfileReducer,
        userListReducers,
        userDeleteReducers,
        userUpdateReducers,
} from './reducers/userReducers'
import {
        orderCreateReducer,
        orderDetailReducer,
        orderListMyReducer,
        orderPayReducer
} from './reducers/orderReducers'

const reducer = combineReducers({
    //CART STATE
    cart: cartReducer,

    // PRODUCT STATE
    productList: productListReducer,
    productDetail: productDetailReducer,
    deleteProduct : productDeleteReducer,
    productCreate: productCreateReducer,
    updateProduct: productUpdateReducer,
    
    // USER STATE
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducers,
    
    // ORDER STATE
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
})

// CART INFO STORE
const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems')) 
: []

// USER INFO STORE
const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo')) 
: null

// SHIPPING ADDRESS
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress')) 
: {}

const initialState = {
    cart : { 
            cartItems: cartItemsFromStorage,
            shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(
            ...middleware
        )
    )
)

export default store