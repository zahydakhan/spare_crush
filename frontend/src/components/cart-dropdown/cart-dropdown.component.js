import React from "react";
import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/cutombutton.component";
import CartItem from "../cart-item/cart-item.component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartHidden } from "../../redux/actions/cart/cart.actions";

const CartDropdown = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleCartHidden());
  };
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              name={cartItem.part_number}
              description={cartItem.vendor_name}
              price={cartItem.aud}
              quantity={cartItem.quantity}
            />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <Link to={"/carts"}>
        <CustomButton onClick={toggle}>GO TO CHECKOUT</CustomButton>
      </Link>
    </div>
  );
};

export default CartDropdown;
