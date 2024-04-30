import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./checkoutSuccess.css"
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="wrapper">
      <CheckCircleIcon style={{width: "100px", height: "100px", color: "#2fb02f"}}/>
      <div className="detail">
        <h1 className="title" style={{marginBottom: "10px"}}>Thank You!</h1>
        <span className="desc">Payment done Successfully</span>
        <span>You will redirected to the home page shortly or click here to return to home page</span>
      </div>
      <Link to="/">
      <button className="btn">Home</button>
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
