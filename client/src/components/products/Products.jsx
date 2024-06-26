import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../../data";
import Product from "./Product";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([])
  const [filterProduct, setFilterProduct] = useState([])
  
  useEffect(()=>{
    const getProduct = async()=>{
      try {
        const res = await axios.get(
          cat
            ? `https://louis-a89w.onrender.com/api/products?category=${cat}`
            : "https://louis-a89w.onrender.com/api/products"
          ,{withCredentials:true});
          //console.log(res.data);
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
        })
      }
    }
    getProduct();
  },[cat])

  useEffect(()=>{
    cat && setFilterProduct(
      products.filter((item)=>
        Object.entries(filters).every(([key, value])=>
          item[key].includes(value)
        )
      )
    )
  },[products, cat, filters])

  useEffect(() => {
    if (sort === "newest") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <h1 style={{display: "flex", justifyContent:"center", fontWeight: "bold"}}> New Products</h1>
      <Container>
      {cat
        ? filterProduct.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
            <ToastContainer/>
      </Container>
    </>
  );
};

export default Products;
