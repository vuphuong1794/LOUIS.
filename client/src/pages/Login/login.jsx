import styled from "styled-components";
import {mobile} from "../../responsive";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../../components/redux/apiCall";
import {Navigate} from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { isFetching, error, currentUser} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogin = (e)=>{
    e.preventDefault();
    login(dispatch, {username, password})
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
          <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Button onClick={handleLogin} disabled={isFetching}>Login</Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>Forget pasword?</Link>
          <Link>Sign Up</Link>

          {currentUser!=null && <Navigate to="/"/>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;