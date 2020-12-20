import { combineReducers } from "redux";

import themeReducer from "./themeReducers";
import userReducer from "./userReducers";
import userInfoReducer from './userInfoReducer'
import cartReducer from './cart/cart.reducer'

import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'userInfoReducer', 'cartReducer']
}

const rootReducer = combineReducers({
    themeReducer,
    userReducer,
    userInfoReducer,
    cartReducer,
});

export default persistReducer(persistConfig, rootReducer)