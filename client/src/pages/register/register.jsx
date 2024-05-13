import styled from "styled-components";
import { mobile } from "../../responsive";
import { useState } from "react";
import axios from "axios";
import { login } from "../../components/redux/apiCall";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({width: "65%"})}

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid gray;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  ${mobile({width: "100%"})}
`;

const Register = () => {
  const [info, setInfo] = useState({})
  const [success, setSuccess] = useState(false);
  const dispatch=useDispatch();

  const handleChange = (e)=>{
    setInfo((prev)=>({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async (e)=>{
    e.preventDefault();
    try{
      const newUser ={ ...info}
      await axios.post("https://louis-a89w.onrender.com/api/auth/register", newUser);

      login(dispatch, {username: newUser.username, password: newUser.password})
      setSuccess(true);
    } catch(err){
      console.log(err)
    }

  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" type="text" id="name" onChange={handleChange}/>
          <Input placeholder="last name" type="text" id="last name" onChange={handleChange}/>
          <Input placeholder="username" type="text" id="username" onChange={handleChange}/>
          <Input placeholder="email" type="text" id="email" onChange={handleChange}/>
          <Input placeholder="password" type="password" id="password" onChange={handleChange}/>
          <Input placeholder="confirm password" type="password" id="confirm password" onChange={handleChange}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
          {success && <Navigate to="/"/>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;