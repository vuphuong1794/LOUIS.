import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;

const ProductWrapper = styled.div`
  flex: 0 0 calc(25% - 15px);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 10px);
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://louis-a89w.onrender.com/api/products?category=${cat}`
            : "https://louis-a89w.onrender.com/api/products",
          
        );
        setProducts(res.data);
      } catch (err) {
        toast.error("Please login again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Title>New Products</Title>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <ProductWrapper key={item._id}>
                <Product item={item} />
              </ProductWrapper>
            ))
          : products
              .slice(0, 8)
              .map((item) => (
                <ProductWrapper key={item._id}>
                  <Product item={item} />
                </ProductWrapper>
              ))}
      </Container>
      <ToastContainer />
    </>
  );
};

export default Products;