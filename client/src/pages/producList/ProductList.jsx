import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import "./productList.css";
import Products from "../../components/products/Products";
import NewLetters from "../../components/newLetter/NewLetters";
import Footer from "../../components/Footer/Footer";

const ProductList = () => {
  return (
    <div className="List-container">
      <Navbar />
      <Announcement />
      <h1 style={{margin: "20px"}}> Dresses</h1>
      <div className="filter-container">
        <div className="Filter">
          <div className="FilterText">Filter Products:</div>
          <select className="Select">
            <option disabled selected>
              Color
            </option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>
          <select className="Select">
            <option disabled selected>
              Size
            </option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="Filter">
          <div className="FilterText">Sort Products:</div>
          <select className="Select">
            <option selected>Newest</option>
            <option>Price (asc)</option>
            <option>Price (desc)</option>
          </select>
        </div>
      </div>
      <Products />
      <NewLetters />
      <Footer />
    </div>
  );
};

export default ProductList;
