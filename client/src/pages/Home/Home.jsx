import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import Slider from "../../components/slider/Slider";
import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";
import NewLetters from "../../components/newLetter/NewLetters";
import Footer from "../../components/Footer/Footer";
import Voucher from "../voucher/voucher";
import Cookies from "js-cookie";
const Home = () => {
  const accessToken = Cookies.get("access_token");
  /*
  const notify = () =>
    toast.error("Please login again!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    if (!accessToken) {
      notify();
    }*/
  // thêm scroll to top
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Voucher />
      <Products />
      <NewLetters />
      <Footer />
    </div>
  );
};

export default Home;
