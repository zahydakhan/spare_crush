import * as types from '../../constants';

export function toggleCartHidden() {
    return {
        type: types.TOGGLE_CART_HIDDEN,
    }
}


export function addItem(item) {
    return {
        type: types.ADD_ITEM,
        payload: item
    }
}


export function RemoveItem(item) {
    return {
        type: types.REMOVE_ITEM,
        payload: item
    }
}

export function EmptyCart(item) {
    return {
        type: types.EMPTY_CART,
        payload: item
    }
}