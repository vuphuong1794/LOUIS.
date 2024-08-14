import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import Slider from "../../components/slider/Slider";
import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";
import NewLetters from "../../components/newLetter/NewLetters";
import Footer from "../../components/Footer/Footer";
import Cookies from "js-cookie";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { mobile } from '../../responsive';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 50%;
  display: ${({ show }) => (show ? "block" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  transition: opacity 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #333;
  ${mobile({ fontSize: "20px" })} 
`;

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Title>FEATURED CATEGORIES</Title>
      <Categories />
      <Products />
      <NewLetters />
      <Footer />
      <ScrollButton show={showScroll} onClick={scrollToTop}>
        <ArrowUpwardIcon />
      </ScrollButton>
    </div>
  );
};

export default Home;
