import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({height: "30vh"})}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Title = styled.h1`
    color: white;
    font-size: 40px;
    font-weight: bold;
    color: whitesmoke;
    margin-bottom: 20px;
    ${mobile({fontSize: "30px"})}
`;

const Button = styled.button`
  border: none;
    border-radius: 2px;
    padding: 15px;
    background-color: whitesmoke;
    color:#000;
    cursor: pointer;
    font-weight: 700;
    ${mobile({fontSize: "13px"})}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>EXPLORE THE SELECTION </Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;