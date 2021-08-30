import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import Cookies from "js-cookie";

import "./Navbar.css";

import { CartState } from "../../Context/CartProvider";

const Navbar = ({ click }) => {
  const history = useHistory();

  const [cartQty, setCartQty] = useState(0);

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
    <nav className="navbar">
      <div className="navbar_logo">
        <h2>Logo</h2>
      </div>

      <ul className="navbar_links">
        <li>
          <Link to="/cart" className="cart_link">
            <span class="position-relative">
              <FiShoppingCart />
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
              <button className="btn btn-danger" onClick={Logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className="btn btn-success" onClick={Signin}>
                Signin
              </button>
            </li>
            <li>
              <button className="btn btn-warning" onClick={Signup}>
                Signup
              </button>
            </li>
          </>
        )}
      </ul>

      <div className="hamburger_menu">
        <HiMenu className="hamburger_logo1" onClick={click} />
      </div>
    </nav>
  );
};

export default Navbar;
