import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import "./SingleProduct.css";
import styled from "styled-components";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const FilterColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const SingleProduct = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="Wrapper">
        <div className="imgContainer">
          <img src="https://i.ibb.co/S6qMxwr/jean.jpg" />
        </div>
        <div className="infoContainer">
          <h1>Denim Jumpsuit</h1>
          <p className="Desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </p>
          <p className="Price">$ 20</p>
          <div className="FilterContainer">
            <div className="Filter2">
              <div className="FilterTitle">Color</div>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </div>
            <div className="Filter">
              <div className="FilterTitle">Size</div>
              <select className="FilterSize">
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
          </div>
          <div className="AddContainer">
            <div className="AmountContainer">
              <RemoveIcon />
              <div className="Amount">1</div>
              <AddIcon />
            </div>
            <button className="add-btn">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
