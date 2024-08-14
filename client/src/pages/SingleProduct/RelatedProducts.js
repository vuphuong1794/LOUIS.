import styled from "styled-components";
import { Link } from "react-router-dom";

const RelatedProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const RelatedProductItem = styled.div`
  flex: 0 0 calc(25% - 20px);
  margin: 10px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5fbfd;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const RelatedProductImage = styled.img`
  height: 12%; /* Điều chỉnh chiều cao của hình ảnh để nó vừa khung */
  object-fit: cover;
`;

const RelatedProductInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

const RelatedProductTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 16px;
`;

const RelatedProductPrice = styled.span`
  font-weight: bold;
`;

const RelatedProducts = ({ products }) => {
  return (
    <RelatedProductContainer>
      {products.map((item) => (
        <RelatedProductItem key={item._id}>
          <Link to={`/product/${item._id}`}>
            <RelatedProductImage src={item.img} alt={item.title} />
            <RelatedProductInfo>
              <RelatedProductTitle>{item.title}</RelatedProductTitle>
              <RelatedProductPrice>$ {item.price}</RelatedProductPrice>
            </RelatedProductInfo>
          </Link>
        </RelatedProductItem>
      ))}
    </RelatedProductContainer>
  );
};

export default RelatedProducts;
