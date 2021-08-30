import React from "react";
import "./Navbar.css";

const Backdrop = ({ show, click }) => {
  return show && <div className="backdrop" onClick={click}></div>;
};

export default Backdrop;
