import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";
import Announcement from "../../components/Announcement/Announcement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link,  useNavigate  } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PayButton from "../../components/PayButton";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../../components/redux/cartRedux";
import "./cart.css"
import Cookies from "js-cookie";

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
  border: 2px solid gray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 20px 0px;
  
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
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

const ZaloPay=styled.div`
    background-color: #118ACB;
    color: white;
    font-size: 16px;
    font-weight: 600;
    width: 250px;
    margin: 5px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
`

const Cod=styled.div`
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 600;
    width: 250px;
    margin: 5px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
`

const CheckOutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const KEY =
  "pk_test_51P414nRv7rbjgIfEcr3bsEFOPqy18yMaSO25VtSFYfrTCySImPeIicGpxoKFdNVi5OnZCfsWwmtFAlQWttNLybTl00vnMsE8R3";

  const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [onCheckOut, setOnCheckOut] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");
    const navigate = useNavigate();
  
    const notify = () =>
      toast.success("🦄 Tính năng đang trong giai đoạn thử nghiệm", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
    useEffect(() => {
      dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
      // Log current user when component mounts or user changes
      console.log("Current user:", currentUser);
    }, [currentUser]);

    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
    };
    const handleDecreaseCart = (product) => {
      dispatch(decreaseCart(product));
    };
    const handleClearCart = () => {
      dispatch(clearCart());
    };
  
    const handleCheckout = async (e) => {
      e.preventDefault();
    
      if (!shippingAddress) {
        toast.error("Please enter a shipping address!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    
      const orderData = {
        userId: currentUser._id || currentUser.id,
        products: cart.products.map((product) => ({
          productImg: product.img,
          productId: product._id,
          quantity: product.quantity,
        })),
        amount: cart.total || cart.cartTotalAmount, 
        address: shippingAddress,
      };
    
      // Log orderData to debug
      console.log("Order data:", orderData);
    
      try {
        const res = await axios.post(
          `https://louis-a89w.onrender.com/api/orders`,
          orderData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
    
        console.log("Response from server:", res);
    
        if (res.status === 201) { // Assuming 201 Created
          notify("Order created successfully!");
          dispatch(clearCart());
        } else {
          toast.error(`Unexpected response: ${res.statusText}`);
        }
      } catch (err) {
        console.error("Error creating order:", err.response?.data || err.message);
        toast.error(`Error creating order: ${err.response?.data?.message || err.message}`);
      }
        
    };
    
    
    
    const handleOkClick = () => {
      if (!currentUser) {
        toast.error("Please login to continue with checkout!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login");
      } else {
        setOnCheckOut(true);
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
            <RemoveAll onClick={handleClearCart}>Remove all</RemoveAll>
          </Top>
          <Bottom>
            {cart.products.length === 0 ? (
              <div
                onClick={() =>
                  toast.error("Your cart is empty!", {
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
                  alt="empty cart"
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
                  {cart.products &&
                    cart.products.map((product) => (
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
                              <span style={{ paddingRight: "10px" }}>
                                Color:{" "}
                              </span>
                              <ProductColor color={product.color} />
                            </div>
                            <ProductSize>
                              <b>Size:</b> {product.size}
                            </ProductSize>
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductAmountContainer>
                            <AddIcon onClick={() => handleAddToCart(product)} />
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <RemoveIcon
                              onClick={() => handleDecreaseCart(product)}
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
                    <SummaryItemPrice>${cart.cartTotalAmount}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                  </SummaryItem>
                  <div className="voucherInput">
                    <input type="text" placeholder="Enter voucher here" />
                    <button>Apply</button>
                  </div>
                  <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>${cart.cartTotalAmount}</SummaryItemPrice>
                  </SummaryItem>
                  {onCheckOut ? (
                    <CheckOutWrapper>
                      <div onClick={handleCheckout}>
                        <PayButton cartItems={cart.products} />
                      </div>
                      <ZaloPay onClick={notify}>Continue with ZaloPay</ZaloPay>
                      <Cod>Cash On Delivery</Cod>
                    </CheckOutWrapper>
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
                        <Button onClick={handleOkClick}>Ok</Button>
                      </InputWrapper>
                    </>
                  )}
                </Summary>
              </>
            )}
          </Bottom>
          <ToastContainer />
        </Wrapper>
        <Footer />
      </Container>
    );
  };
  
  export default Cart;