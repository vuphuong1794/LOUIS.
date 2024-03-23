import React from 'react'
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
const Navbar = () => {
  return (
    <div className="nav-container">
        <div className="wrapper">
            <div className="left">
                <span className="language">EN</span>
                <div className="search-container">
                    <input placeholder='search ...' className='input'/>
                    <SearchIcon style={{color: "gray", fontSize: "16px"}}/>
                </div>
            </div>
            <div className="center">
                <h1 className="logo">
                    LOBOO.
                </h1>
            </div>
            <div className="right">
                <div className="menuItem">
                    Register
                </div>
                <div className="menuItem">Sign in</div>
                <div className="menuItem">
                <Badge badgeContent={4} color="primary">
                    <ShoppingCartOutlined />
                </Badge>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar