import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartState } from "../../Context/CartProvider";

const Product_info = () => {
  // Declare Context Initials
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const history = useHistory();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const callHome = async () => {
    try {
      const res = await fetch("https://e-commerce-site-v1.herokuapp.com/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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

  useEffect(() => {
    callHome();
  }, []);

  const [productData, setProductData] = useState({});
  useEffect(async () => {
    const res = await axios.post(`/product/id`, {
      id: id,
    });
    setProductData(res.data);
  }, []);

  const addToCart = async () => {
    const res = await fetch(
      "https://e-commerce-site-v1.herokuapp.com/add_to_cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productData._id,
          id: userInfo._id,
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
      toast.dark("📦 Added To Cart", {
        position: "top-right",
      });
    } else if (res.status === 400) {
      window.alert("No prodct found");
    } else if (res.status === 500) {
      window.alert("Server error");
    } else window.alert("Danger");
  };

  // console.log(productData);
  // console.log(userInfo);

  // Declare Context Initials
  // const {
  //   state: { cart },
  //   dispatch,
  // } = CartState();

  // Sub total Logic
  // useEffect(() => {
  //   setTotal(
  //     cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
  //   );
  // }, [cart]);

  // Dispatch
  // onChange={(e) =>
  //   dispatch({
  //     type: "CHANGE_CART_QTY",
  //     payload: {
  //       id: prod.id,
  //       qty: e.target.value,
  //     },
  //   })
  // }

  return (
    <div className="product_details">
      {Object.keys(productData).length === 0 ? (
        <h2>Loading</h2>
      ) : (
        <>
          <div className="left_side">
            <div className="left_image">
              <img src={productData.imageUrl} alt="product Img" />
            </div>
            <div className="left_info">
              <p className="left_info_name">{productData.name}</p>
              <p className="left_info_desc">{productData.desc}</p>
              <p className="left_info_price">Price : ₹ {productData.price}</p>
            </div>
          </div>
          <div className="right_side">
            <div className="right_info">
              <p>
                Price : <span>₹ {productData.price}</span>
              </p>
              <p className="">
                Status : <span>In Stock : {productData.countInStock}</span>
              </p>

              <p>
                <a
                  type="button"
                  onClick={addToCart}
                  className="btn btn-dark info_btn"
                >
                  Add To Cart
                </a>
              </p>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Product_info;
