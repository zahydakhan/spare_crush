export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => (
        cartItem.part_number === cartItemToAdd.part_number
    ));

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.part_number === cartItemToAdd.part_number ? {...cartItem, quantity: parseFloat(cartItem.quantity) + parseFloat(cartItemToAdd.quantity) } :
            cartItem)
    }

    return [...cartItems, {...cartItemToAdd, quantity: parseFloat(cartItemToAdd.quantity) }]

}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => (
        cartItem.part_number === cartItemToRemove.part_number
    ));

    if (existingCartItem) {
        return cartItems.filter(cartItem =>
            cartItem.part_number !== cartItemToRemove.part_number)
    }

    return cartItems
};