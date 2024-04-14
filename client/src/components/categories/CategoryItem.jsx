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
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    font-size: 40px;
    font-weight: bold;
    color: whitesmoke;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:2px solid ;
    border-radius: 10px;
    padding: 15px;
    background-color: white;
    color:black;
    cursor: pointer;
    font-weight: 800;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;