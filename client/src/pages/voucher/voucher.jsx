import React from "react";
import "./voucher.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from '@mui/icons-material/Discount';
import BoltIcon from '@mui/icons-material/Bolt';

const Voucher = () => {
  return (
    <>
      <h1 className="title">Vouchers</h1>
      <div className="searchVoucher">
        <input type="text" placeholder="enter voucher" />
        <button>Find</button>
      </div>
      <div className="container">
        <div className="shippingVoucher">
          <h4 className="item">Shipping Voucher</h4> 
          <LocalShippingIcon />
        </div>
        <div className="discountVoucher">
          <h4>discount voucher </h4>
          <DiscountIcon/>
          </div>
        <div className="xtraVoucher">
          <h4>Xtra Voucher</h4>
          <BoltIcon/>
          </div>
      </div>
    </>
  );
};

export default Voucher;
