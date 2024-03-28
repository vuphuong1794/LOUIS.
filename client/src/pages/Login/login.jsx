import React from 'react'
import styled from "styled-components"
import "./login.css"

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
const Login = () => {
  return (
    <div className="login-container">
        <div className="login-wrapper">
            <h1 style={{color: "black", display: "flex", justifyContent:"center", padding: "10px"}}>Login</h1>
            <div className="form">
                <input placeholder="username"/>
                <input placeholder="password"/>
                <button className="log-btn">LOGIN</button>
                <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </div>
        </div> 
    </div>
  )
}

export default Login