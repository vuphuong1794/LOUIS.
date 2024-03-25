import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import "./newletter.css"

const NewLetters = () => {
  return (
    <div className="newLetter-container">
        <h1 style={{color: "black", fontSize: "70px", marginBottom: "20px"}}> New Letter</h1>
        <span style={{fontSize: "20px", marginBottom: "5px"}}>Get timely updates from your favorite products</span>
        <div className="Input">
            <input placeholder="Your Email "/>
            <SendIcon style={{marginRight: "5px"}}/>
        </div>
    </div>
  )
}

export default NewLetters