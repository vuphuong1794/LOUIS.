import React from 'react'
import "./categoryItem.css"

const CategoryItem = ({item}) => {
  return (
    <div className='cateItem-container'>
        <div className="image">
            <img src={item.img}/>
        </div>
        <div className="info">
            <h1 className="title">{item.title}</h1>
            <button className="btn">Shop now</button>
        </div>
    </div>
  )
}

export default CategoryItem