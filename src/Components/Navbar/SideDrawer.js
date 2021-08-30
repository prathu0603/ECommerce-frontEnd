import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import Cookies from "js-cookie";

import "./Navbar.css";

import { CartState } from "../../Context/CartProvider";

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ["sidedrawer"];
  const history = useHistory();
  const [cartQty, setCartQty] = useState(0);

  if (show) {
    sideDrawerClass.push("show");
  }
  const {
    state: { cart, user },
    dispatch,
  } = CartState();

  useEffect(() => {
    setCartQty(cart.length);
  }, [cart]);

  const Logout = async () => {
    Cookies.remove("jwtToken");
    localStorage.removeItem("product");
    localStorage.setItem("user", false);
    await dispatch({
      type: "USER",
      payload: JSON.parse(localStorage.getItem("user")),
    });
    await dispatch({
      type: "INITIAL",
      payload: [],
    });
    history.push("/signin");
  };
  const Signin = () => {
    history.push("/signin");
  };
  const Signup = () => {
    history.push("/signup");
  };
  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer_links" onClick={click}>
        <li>
          <Link to="/cart">
            <span class="position-relative">
              <FiShoppingCart />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartQty}
              </span>
            </span>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <button
                className="btn btn-danger siderdrawer_btn"
                onClick={Logout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                className="btn btn-success siderdrawer_btn"
                onClick={Signin}
              >
                Signin
              </button>
            </li>
            <li>
              <button
                className="btn btn-warning siderdrawer_btn"
                onClick={Signup}
              >
                Signup
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideDrawer;
