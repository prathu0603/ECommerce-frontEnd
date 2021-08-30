import React from "react";
import { Link } from "react-router-dom";

import "./product.css";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt="product IMG" />
      <div className="product_info">
        <p className="info_name">{product.name}</p>
        <p className="info_desc">{product.desc}</p>
        <p className="info_price">₹ {product.price}</p>
        <Link to={`/product/${product._id}`} className="info_btn btn btn-dark">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
