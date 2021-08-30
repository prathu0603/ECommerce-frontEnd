import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { HiMinus } from "react-icons/hi";
import "./cart.css";

import { CartState } from "../../Context/CartProvider";

const CartItem = ({ item, userId }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const increase_qty = async () => {
    const res = await fetch(
      "https://e-commerce-site-v1.herokuapp.com/add_to_cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
          id: userId,
        }),
      }
    );

    const data = await res.json();
    await localStorage.setItem("product", JSON.stringify(data.cart));
    const updatedCart = await JSON.parse(localStorage.getItem("product"));

    dispatch({
      type: "ADD_TO_CART",
      payload: updatedCart,
    });

    if (res.status === 200) {
      // console.log("item added to cart");
    } else if (res.status === 400) {
      window.alert("No prodct found");
    } else if (res.status === 500) {
      window.alert("Server error");
    } else window.alert("Danger");
  };

  const decrease_qty = async () => {
    const res = await fetch(
      "https://e-commerce-site-v1.herokuapp.com/remove_from_cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
          id: userId,
        }),
      }
    );

    const data = await res.json();
    await localStorage.setItem("product", JSON.stringify(data.cart));
    const updatedCart = await JSON.parse(localStorage.getItem("product"));

    dispatch({
      type: "DECREASE_QTY",
      payload: updatedCart,
    });

    if (res.status === 201) {
      // console.log("item dec to cart");
    } else if (res.status === 400) {
      window.alert("No prodct found");
    } else if (res.status === 500) {
      window.alert("Server error");
    } else window.alert("Server error");
  };

  const deleteFromCart = async () => {
    const res = await fetch(
      `https://e-commerce-site-v1.herokuapp.com/delete_from_cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: item._id,
          id: userId,
        }),
      }
    );

    const data = await res.json();
    await localStorage.setItem("product", JSON.stringify(data.cart));
    const updatedCart = await JSON.parse(localStorage.getItem("product"));

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: updatedCart,
    });

    if (res.status === 201) {
      // console.log("delete success");
    }
  };
  return (
    <div className="cart_item">
      <div className="cart_item_image">
        <img src={item.img} alt="prod img" />
      </div>

      <p>{item.name}</p>

      <p className="cart_item_price">₹ {item.price}</p>
      <div className="quantity">
        <a className="add_btn" onClick={increase_qty}>
          <IoMdAdd />
        </a>
        <span>{item.quantity}</span>
        {item.quantity === 1 ? (
          <>
            <a
              className="cart_item_btn_dlt btn btn-danger"
              onClick={deleteFromCart}
            >
              <AiTwotoneDelete />
            </a>
          </>
        ) : (
          <>
            <a className="remove_btn" onClick={decrease_qty}>
              <HiMinus />
            </a>
          </>
        )}
      </div>
      {item.quantity > 1 && (
        <a
          className="cart_item_btn_dlt btn btn-danger"
          onClick={deleteFromCart}
        >
          <AiTwotoneDelete />
        </a>
      )}
    </div>
  );
};

export default CartItem;
