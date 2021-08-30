import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import CartItem from "./CartItem";
import "./cart.css";

import { CartState } from "../../Context/CartProvider";

const Cart = () => {
  const {
    state: { cart },
  } = CartState();

  const [userInfo, setUserInfo] = useState([]);
  const [cartInfo, setCartInfo] = useState(cart);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setCartInfo(cart);
  }, [cart]);

  // Sub total Logic
  useEffect(() => {
    setSubTotal(cart.reduce((acc, curr) => acc + Number(curr.total), 0));
  }, [cart]);

  const history = useHistory();

  useEffect(() => {
    const callHome = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-site-v1.herokuapp.com/home",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await res.json();
        setUserInfo(data);

        if (!(res.status === 200)) {
          console.log("no user");
          history.push("/signin");
        }
      } catch (error) {
        console.log("Server Error");
        history.push("/signin");
      }
    };
    callHome();
  }, []);

  return (
    <>
      {cartInfo?.length > 0 ? (
        <div className="cart">
          <div className="cart_left">
            <h2 className="cart_heading">Shopping Cart</h2>
            {cartInfo.map((item) => (
              <CartItem key={item._id} item={item} userId={userInfo._id} />
            ))}
          </div>
          <div className="cart_right">
            <div className="cart_right_info">
              <p>Cart Subtotal : ₹ {subTotal}</p>
            </div>
            <div>
              <button className="btn btn-dark cart_btn">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img
            className="cart_empty_img"
            src="https://thumbs.gfycat.com/SlushyObedientGrackle-max-1mb.gif"
            alt="Empty Cart Img"
          />
          <h2 className="cart_empty">Cart Looks Empty ......</h2>
        </>
      )}
    </>
  );
};

export default Cart;
