import React from "react";
import "./cart-item.styles.scss";

const CartItem = ({ name, description, price, quantity }) => (
  <div className='cart-item'>
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='name'>{description}</span>
      <span className='price'>
        {quantity} X ${price}
      </span>
    </div>
  </div>
);

export default CartItem;
