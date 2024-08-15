import styled from "styled-components";
import { mobile } from "../../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../components/redux/apiCall";
import { Link, Navigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  ${mobile({ width: "85%" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px;
  background-color: teal;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkcyan;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: teal;
  text-align: center;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;
const ForgetPassword = styled(StyledLink)`
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 12px;
  color: teal;
  ${mobile({ fontSize: "10px" })}
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            Login
          </Button>
          {error && <Error>{error?.data?.message}</Error>}
          <StyledLink  to="#">Forgot password?</StyledLink>
          <StyledLink to="/register">Don't have an account? Sign Up</StyledLink>
          {currentUser != null && <Navigate to="/" />}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
