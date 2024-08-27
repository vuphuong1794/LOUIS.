import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RelatedProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  padding: 0 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
`;

const RelatedProductItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const RelatedProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RelatedProductInfo = styled.div`
  padding: 15px;
  text-align: center;
`;

const RelatedProductTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const RelatedProductPrice = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #4CAF50;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ViewMoreButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RelatedProducts = ({ products }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <RelatedProductContainer>
      <ProductGrid>
        {displayedProducts.map((item) => (
          <Link to={`/product/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
            <RelatedProductItem>
              <RelatedProductImage src={item.img} alt={item.title} />
              <RelatedProductInfo>
                <RelatedProductTitle>{item.title}</RelatedProductTitle>
                <RelatedProductPrice>$ {item.price}</RelatedProductPrice>
              </RelatedProductInfo>
            </RelatedProductItem>
          </Link>
        ))}
      </ProductGrid>
      {!showAll && products.length > 4 && (
        <ViewMoreButton onClick={() => setShowAll(true)}>
          Xem thêm
        </ViewMoreButton>
      )}
    </RelatedProductContainer>
  );
};

export default RelatedProducts;