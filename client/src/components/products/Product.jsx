import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    min-width: 140px;
    height: 250px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 75%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;

  ${Container}:hover & {
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-weight: bold;
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ ...item, quantity: 1, size: item.size[0] }));
  };

  return (
    <Container>
      <ImageContainer>
        <Circle />
        <Image src={item.img} />
        <Info>
          <Icon>
            <ShoppingCartOutlinedIcon onClick={handleClick} />
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderOutlinedIcon />
          </Icon>
        </Info>
      </ImageContainer>
      <ProductInfo>
        <Title>{item.title}</Title>
        <Price>${item.price}</Price>
      </ProductInfo>
    </Container>
  );
};

export default Product;