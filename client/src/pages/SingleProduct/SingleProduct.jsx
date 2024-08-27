import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import styled from "styled-components";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../../responsive";
import Newsletter from "../../components/newLetter/NewLetters";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../../components/redux/cartRedux";
import { useDispatch } from "react-redux";
import ReviewsAndComments from "../../components/review/ReviewsAndComments ";
import { toast, ToastContainer } from "react-toastify";
import RelatedProducts from "./RelatedProducts";
import ProductDescription from "./ProductDescription"
const Container = styled.div`
background-color: #f8f9fa;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  ${mobile({ padding: "20px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Image = styled.img`
width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  ${mobile({ height: "300px" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "20px" })}
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 28px;
  color: #4caf50;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
`;

const FilterColor = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "#333" : "gray")};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const FilterSize = styled.select`
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ flexDirection: "row" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;

const Button = styled.button`
  padding: 15px 30px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #00796b;
    transform: translateY(-2px);
  }
`;

const OtherProductsHeader = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 40px 0 30px;
  padding: 15px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: #4CAF50;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin: 30px 0 20px;
  }
`;

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const dispatch = useDispatch();

  const getRelatedProducts = async (category) => {
    try {
      const res = await axios.get(
        `https://louis-a89w.onrender.com/api/products?category=${category}&limit=4`
      );
      setRelatedProducts(res.data.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://louis-a89w.onrender.com/api/products/find/${id}`
        );
        setProduct(res.data);
        getRelatedProducts(res.data.categories[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://louis-a89w.onrender.com/api/products/find/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    toast.success("Product added to cart", {
      position: "bottom-left",
    });
    dispatch(addToCart({ ...product, quantity, color, size }));
  };

  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt={product.title} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <ProductDescription description={product.desc} />
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor 
                  color={c} 
                  key={c} 
                  onClick={() => setColor(c)}
                  selected={color === c}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption>Select Size</FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} style={{ cursor: 'pointer' }} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} style={{ cursor: 'pointer' }} />
            </AmountContainer>
            <Button onClick={handleClick} className="add-btn">
              ADD TO CART
            </Button>
          </AddContainer>
          <ReviewsAndComments productId={id} />
        </InfoContainer>
        <ToastContainer />
      </Wrapper>
      <OtherProductsHeader>Products You May Also Like</OtherProductsHeader>
      <RelatedProducts products={relatedProducts} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default SingleProduct;