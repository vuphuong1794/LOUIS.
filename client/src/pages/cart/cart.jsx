import React from 'react'
import styled from "styled-components"
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/Announcement/Announcement'
import Footer from '../../components/Footer/Footer'

const container = styled.div`
`
const cart = () => {
  return (
    <container>
        <Navbar/>
        <Announcement/>
        cart
        <Footer/>
    </container>
  )
}

export default cart