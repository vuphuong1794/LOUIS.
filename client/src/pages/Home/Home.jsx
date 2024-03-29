import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/Announcement/Announcement'
import Slider from '../../components/slider/Slider'
import Categories from '../../components/categories/Categories'
import Products from '../../components/products/Products'
import NewLetters from '../../components/newLetter/NewLetters'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <Slider/>
        <Categories/>
        <Products/>
        <NewLetters/>
        <Footer/>
    </div>
  )
}

export default Home