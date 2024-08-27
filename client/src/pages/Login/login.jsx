import styled from "styled-components";
import { mobile } from "../../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../components/redux/apiCall";
import { Link, Navigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

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
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  ${mobile({ width: "85%" })}
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const GoogleButton = styled(Button)`
  background-color: #4081EC;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: gray;
  }
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
  }

  span {
    padding: 0 10px;
    color: #757575;
    font-size: 14px;
  }
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: #4285f4;
  text-align: center;
  text-decoration: none;
  margin-top: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled.span`
  color: #d32f2f;
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
        <Title>Welcome Back</Title>
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
            Sign In
          </Button>
          {error && <Error>{error?.data?.message}</Error>}
          <Separator>
            <span>OR</span>
          </Separator>
          <GoogleButton>
            <GoogleIcon /><a href="https://louis-a89w.onrender.com/auth/google" style={{textDecoration: "none", color: "white"}}>Sign in with Google</a> 
          </GoogleButton>
          <StyledLink to="#">Forgot password?</StyledLink>
          <StyledLink to="/register">Don't have an account? Sign Up</StyledLink>
          {currentUser != null && <Navigate to="/" />}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;