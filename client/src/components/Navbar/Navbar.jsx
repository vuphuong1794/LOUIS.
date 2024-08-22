import React, { useEffect } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { logOut } from "../redux/apiCall";
import { useState } from "react";
import Cookies from "js-cookie";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ flex: "0" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  text-decoration: none;
  ${mobile({ display: "none" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const PopUp = styled.div`
  display: flex;
  top: 80px;
  right: 140px;
  position: absolute;
  padding: 5px;
  flex-direction: column;
  z-index: 1;
  background: whitesmoke;
  cursor: pointer;
  border: 1px solid;
  ${mobile({ right: "70px" })}
`;

const Contact = styled.span`
  ${mobile({ fontSize: "14px", marginLeft: "5px" })}
`;

const SearchContainer = styled.form`
  border: 1px solid #706f6f;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
  ${mobile({ border: "none", marginLeft: "0px", fontSize: "30px"  })}
`;

const MobileInput= styled.input`
  position:absolute;
  top: 70px; 
  left: 20px;
  padding: 10px;
  border-radius: 5px;
  z-index: 999;
  display: none;
  ${mobile({display: "flex"})}
`
const Exist = styled.span`
  position: absolute;
  padding: 10px;
  color: black;
  top: 60px;
  display: none;
  left: 210px;
  z-index: 999;
  ${mobile({display: "flex"})}
`

const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.cartTotalQuantity);
  const actualQuantity = quantity < 0 ? 0 : quantity;
  const { currentUser } = useSelector((state) => state.user);
  const [logout, setLogout] = useState(false);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(dispatch);
    setLogout(false);
    Cookies.remove("access_token");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/${input}`);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer onSubmit={handleSearch}>
            <Input
              placeholder="search ..."
              onChange={(e) => setInput(e.target.value)}
              list="items"
            />
            <SearchIcon
              style={{ color: "gray", fontSize: 18 }}
              onClick={() => setClicked(!clicked)}
            />
            <datalist id="items" className="datalist">
              <option value="bag">bag</option>
              <option value="tshirt">tshirt</option>
              <option value="short">short</option>
            </datalist>
          </SearchContainer>
        </Left>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div className="center">
            <Logo>LOUIS.</Logo>
          </div>
        </Link>
        <Right>
          {currentUser == null ? (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Register</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="menuItem">Sign in</div>
              </Link>
            </>
          ) : (
            <>
              <PersonOutlineIcon />
              <span
                onClick={() => setLogout(!logout)}
                style={{ cursor: "pointer" }}
              >
                {currentUser.displayName || currentUser.username}
              </span>
              {logout && (
                <PopUp>
                  <Link
                    to="/order"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span>View order</span>
                  </Link>
                  <span style={{ padding: "5px" }} onClick={handleLogout}>
                    Log out
                  </span>
                </PopUp>
              )}
            </>
          )}
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <div className="menuItem">
              <Badge badgeContent={actualQuantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Contact style={{ marginLeft: "10px" }}>Contact Us</Contact>
          </Link>
        </Right>
        {clicked && (
          <form onSubmit={handleSearch}>
            <MobileInput
              placeholder="search ..."
              onChange={(e) => setInput(e.target.value)}
              onSubmit={handleSearch}
              list="items"
            />
            <Exist onClick={()=>setClicked(false)}>X</Exist>
          </form>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
