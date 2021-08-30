import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";

import Product from "../Product/Product";
import axios from "../../axios";
import "./home.css";

const Home = () => {
  const history = useHistory();
  const [productData, setProductData] = useState([]);

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

        if (!(res.status === 200)) {
          history.push("/signin");
        }
      } catch (error) {
        console.log("Server Error");
        history.push("/signin");
      }
    };
    callHome();
  }, []);

  useEffect(async () => {
    const res = await axios("/product");
    setProductData(res.data);
  }, []);
  return (
    <div className="home">
      {productData.length > 0 ? (
        <>
          <h2 className="home_title">Latest Products</h2>
          <div className="home_products">
            {productData.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <h1>Loading........</h1>
      )}
    </div>
  );
};

export default Home;
