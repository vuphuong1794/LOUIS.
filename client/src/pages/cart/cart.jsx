import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";
import Announcement from "../../components/Announcement/Announcement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { mobile } from "../../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  decreaseQuantity,
  increaseQuantity,
  removeAllProducts,
} from "../../components/redux/cartRedux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PayButton from "../../components/PayButton";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width: "180px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "20px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span`
  ${mobile({ fontSize: "14px" })}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({
    flexDirection: "row",
    justifyContent: "space-around",
  })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  padding: 12px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const RemoveAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: black;
  color: white;
`;

const ShippingTitle = styled.h2`
  display: flex;
  font-size: large;
  margin-top: -10px;
  padding-top: 10px;
  border-top: 1px solid;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border: 1px solid;
  height: 30px;
  font-weight: 600;
  padding: 5px;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const KEY =
  "pk_test_51P414nRv7rbjgIfEcr3bsEFOPqy18yMaSO25VtSFYfrTCySImPeIicGpxoKFdNVi5OnZCfsWwmtFAlQWttNLybTl00vnMsE8R3";

const Cart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [onCheckOut, setOnCheckOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  /*
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token, addresses) => {
    setStripeToken(token);
    setShippingAddress(addresses?.shipping);
  };*/

  const notify = () =>
    toast.success("🦄 Payment success!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };
  /*
  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };*/

  const handleRemoveAll = (product) => {
    dispatch(removeAllProducts(product));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        userId: currentUser?._id,
        products: cart.products.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        })),
        amount: cart.total,
        address: shippingAddress,
      };
      const res = await axios.post(
        `http://localhost:8000/api/orders`,
        orderData,
        { withCredentials: true }
      );

      notify();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <RemoveAll onClick={handleRemoveAll}>Remove all</RemoveAll>
        </Top>
        <Bottom>
          {currentUser == null || cart.products.length === 0 ? (
            <div
              onClick={() =>
                toast.error("Please login again!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              }
            >
              <img
                src={
                  "https://blogzine.webestica.com/assets/images/icon/empty-cart.svg"
                }
                style={{ width: "250px", height: "250px" }}
              />
              <h1
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "45px",
                }}
              >
                Oops!
              </h1>
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px 0 70px 0",
                  fontSize: "25px",
                }}
              >
                Your Cart Is Empty
              </h3>
              <ToastContainer />
            </div>
          ) : (
            <>
              <Info>
                {cart.products.map((product, index) => (
                  <Product key={product._id}>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <div style={{ display: "flex" }}>
                          <span style={{ paddingRight: "10px" }}>Color: </span>
                          <ProductColor color={product.color} />
                        </div>
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <AddIcon
                          onClick={() =>
                            dispatch(
                              increaseQuantity(
                                product._id,
                                product.quantity,
                                product.price
                              )
                            )
                          }
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <RemoveIcon
                          onClick={() => handleDecrease(product._id)}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        ${product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                ))}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                </SummaryItem>
                {onCheckOut ? (
                  <div onClick={handleCheckout}>
                    <PayButton cartItems={cart.products} />
                  </div>
                ) : (
                  <>
                    <ShippingTitle>Shipping address</ShippingTitle>
                    <InputWrapper>
                      <Input
                        type="text"
                        placeholder="Enter your address"
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                      />
                      <Button onClick={() => setOnCheckOut(true)}>Ok</Button>
                    </InputWrapper>
                  </>
                )}
              </Summary>
            </>
          )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
