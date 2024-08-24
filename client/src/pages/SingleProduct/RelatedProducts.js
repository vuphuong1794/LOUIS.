import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RelatedProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
`;

const RelatedProductItem = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f5fbfd;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const RelatedProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const RelatedProductInfo = styled.div`
  padding: 10px;
  text-align: center;
  width: 100%;
`;

const RelatedProductTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const RelatedProductPrice = styled.span`
  font-weight: bold;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ViewMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const RelatedProducts = ({ products }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <RelatedProductContainer>
      <ProductGrid>
        {displayedProducts.map((item) => (
          <RelatedProductItem key={item._id}>
            <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <RelatedProductImage src={item.img} alt={item.title} />
              <RelatedProductInfo>
                <RelatedProductTitle>{item.title}</RelatedProductTitle>
                <RelatedProductPrice>$ {item.price}</RelatedProductPrice>
              </RelatedProductInfo>
            </Link>
          </RelatedProductItem>
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