import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/Announcement/Announcement'
import Slider from '../../components/slider/Slider'
import Categories from '../../components/categories/Categories'
import Products from '../../components/products/Products'

const Home = () => {
  return (
    <div>
        <Announcement/>
        <Navbar/>
        <Slider/>
        <Categories/>
        <Products/>
        Home
    </div>
  )
}

export default Home