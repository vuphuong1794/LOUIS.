import React from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/apiCall";
import { useState } from "react";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
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
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
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
    right: 45px;
    position: absolute;
    padding: 5px;
    flex-direction: column;
    z-index: 1;
    background: wheat;
    cursor: pointer;
    border: 1px solid;
`
const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const actualQuantity = quantity < 0 ? 0 : quantity;
  const { currentUser } = useSelector((state) => state.user);
  const [logout, setLogout] = useState(false);
  const handleClick = () => {
    logOut(dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <div className="search-container">
            <Input placeholder="search ..." className="input" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </div>
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
              <span onClick={()=>setLogout(!logout)} style={{cursor: "pointer"}}>{currentUser.username}</span>
              {logout && (<PopUp><Link to="/order"><span>View order</span></Link><span style={{padding: "5px"}} onClick={handleClick}>Log out</span></PopUp>)}
            </>
          )}
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <div className="menuItem">
              <Badge badgeContent={actualQuantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
