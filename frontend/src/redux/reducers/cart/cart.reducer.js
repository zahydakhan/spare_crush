import * as types from '../../constants'

import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

export default function reducer(state = INITIAL_STATE, actions) {
    switch (actions.type) {

        case types.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case types.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, actions.payload)
            }
        case types.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, actions.payload)
            }
        case types.EMPTY_CART:
            return {
                ...state,
                cartItems: []
            }


        default:
            return state
    }
}