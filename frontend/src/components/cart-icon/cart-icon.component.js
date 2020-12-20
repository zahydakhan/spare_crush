import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/Images/shopping-bag.svg";

import { toggleCartHidden } from "../../redux/actions/cart/cart.actions";
import { selectCartCount } from "../../redux/reducers/cart/cart.selectors";
import "./cart-icon.style.scss";

const CartIcon = () => {
  const toggle = () => {
    console.log("dispatching toggle");
    dispatch(toggleCartHidden());
  };
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => selectCartCount(state));

  return (
    <div className='cart-icon' onClick={toggle}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
