import React, { useState } from "react";
import "./contact.css";
import styled from "styled-components";
import { mobile } from "../../responsive";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Group = styled.div`
  position: relative;
  margin-bottom: 35px;
  ${mobile({ marginBottom: "20px" })}
`;

const Input = styled.input`
  font-size: 15px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 500px;
  border: none;
  border-bottom: 1px solid #757575;
  ${mobile({ width: "300px" })}
`;

const Desc = styled.span`
  ${mobile({ fontSize: "15px" })}
`;
const Contact = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  const notify = () =>
    toast.success("🦄 Email send successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      username,
      email,
      subject,
      telephone,
      message,
    };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/mail/sendMail`,
        userInfo,
        { withCredentials: true }
      );
      console.log(response.data);
      notify(); // Show the notification
      setTimeout(() => {
        navigate("/"); // Navigate to the home page after the notification is shown
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  //thêm gg map 
  return (
    <>
      <Link to="/" style={{ color: "black", display: "flex", margin: "20px" }}>
        <ArrowBackIosIcon />
      </Link>
      <div className="wrapper">
        <div className="title">Write us</div>
        <Desc className="desc">
          *All fields marked with a asterisk are required
        </Desc>
        <Group>
          <Input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Your name</label>
        </Group>
        <Group>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Email</label>
        </Group>
        <Group>
          <Input
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Subject</label>
        </Group>
        <Group>
          <Input
            type="text"
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Telephone</label>
        </Group>
        <Group>
          <Input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>*Your message</label>
        </Group>
        <button className="send" onClick={handleSubmit}>
          Send
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Contact;
