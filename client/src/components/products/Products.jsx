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
          ,{withCredentials:true});
          console.log(res.data);
        setProducts(res.data);
      } catch (err) {}
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
      </Container>
    </>
  );
};

export default Products;
