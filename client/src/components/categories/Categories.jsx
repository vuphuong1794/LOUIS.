import React from 'react'
import {categories} from "../../data"
import CategoryItem from './CategoryItem'
import "./categories.css"
const Categories = () => {
  return (
    <div className="category-container">
        {categories.map((item)=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </div>
  )
}

export default Categories