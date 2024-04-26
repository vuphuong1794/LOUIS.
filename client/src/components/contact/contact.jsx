import React from "react";
import "./contact.css";
import styled from "styled-components";
import { mobile } from "../../responsive";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

const Input = styled.input`
  font-size: 15px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 500px;
  border: none;
  border-bottom: 1px solid #757575;
  ${mobile({ width: "300px" })}
`;

const Desc = styled.span`
  ${mobile({ fontSize: "14px" })}
`;
const Contact = () => {
  return (
    <>
      <Link to="/" style={{color: "black", display: "flex", margin: "20px"}}>
        <ArrowBackIosIcon />
      </Link>
      <div className="wrapper">
        <div className="title">Write us</div>
        <Desc className="desc">
          *All fields marked with a asterisk are reuired
        </Desc>
        <div className="group">
          <Input type="text" required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Email</label>
        </div>
        <div className="group">
          <Input type="text" required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Subject</label>
        </div>
        <div className="group">
          <Input type="text" required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Telephone</label>
        </div>
        <div className="group">
          <Input type="text" required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Your message</label>
        </div>
        <button className="send">Send</button>
      </div>
    </>
  );
};

export default Contact;
