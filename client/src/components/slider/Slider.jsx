import React from 'react'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import "./slider.css"
import styled from "styled-components"

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Slider = () => {
    return (
      <div className="slide-container">
          <Arrow direction="left">
              <ArrowBackIosOutlinedIcon/>
          </Arrow>
          <div className="wrapper">
              <div className="slide">
                <div className="ImgContainer">
                    <img src={"https://i.ibb.co/XsdmR2c/1.png"} alt="Image"></img>
                </div>
                  <div className="InfoContainer">
                      phuong
                  </div>
              </div>
          </div>
          <Arrow direction="right">
              <ArrowForwardIosOutlinedIcon/>
          </Arrow>
      </div>
    )
  }

export default Slider