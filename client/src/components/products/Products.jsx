import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../../data";
import Product from "./Product";
import axios from "axios";


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
            ? `http://localhost:8000/api/products?category=${cat}`
            : "http://localhost:8000/api/products"
            
          );
          
        setProducts(res.data);
      } catch (err) {}
    }
    getProduct();
  },[cat])

  return (
    <>
      <h1 style={{display: "flex", justifyContent:"center", fontWeight: "bold"}}> New Products</h1>
      <Container>
        {popularProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Products;
