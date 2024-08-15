import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import Products from "../../components/products/Products";
import NewLetters from "../../components/newLetter/NewLetters";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useLocation } from "react-router-dom";
import { categories } from "../../data";
import Breadcrumb from "./Breadcump";

//STYLE
const Container = styled.div``;

const Title = styled.h1`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  font-size: 60px;
  ${mobile({ fontSize: "40px" })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 1px solid gray;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option`
  border: none;
`;

const Top = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100vw;
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: "25vh" })}
`;

const Desc = styled.span`
  position: absolute;
  bottom: 100px;
  font-size: 30px;
  color: white;
  margin: 0 40px;
  ${mobile({ bottom: "30px", margin: "0 20px", fontSize: "13px" })}
`;

const Sex = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  justify-content: center;
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const categoryImage = categories.find((item) => item.cat === cat)?.img;
  const categoryDesc = categories.find((item) => item.cat === cat)?.desc;

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      
      <Top>
        <Title>{cat}</Title>
        <Desc>{categoryDesc}</Desc>
        <Image src={categoryImage} />
      </Top>
      <Sex>
        <h3
          style={{
            marginRight: "10px",
            width: "80px",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            borderRadius: "50px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Men
        </h3>
        <h3
          style={{
            marginLeft: "10px",
            display: "flex",
            justifyContent: "center",
            width: "80px",
            padding: "10px",
            borderRadius: "50px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Women
        </h3>
      </Sex>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilter}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilter}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <div className="FilterText">Sort Products:</div>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Breadcrumb /> 
      <Products cat={cat} filters={filters} sort={sort} />
      <NewLetters />
      <Footer />
    </Container>
  );
};

export default ProductList;
