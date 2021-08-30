import React, { createContext, useReducer, useContext } from "react";
import { cartReducer } from "./Reducer";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : [],
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : false,
  });

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
