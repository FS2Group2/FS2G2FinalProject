import React, {Component} from 'react'
import {Link} from "react-router-dom";
import '../css/categoriesPage.css';
import Category from "../components/Category";

class Categories extends Component {
  render() {
    const categories = [
      {id: 1, name: "sports", count: 4, categoryImg: "sports.jpg"},
      {id: 2, name: "festivals", count: 5, categoryImg: "fest.jpg"},
      {id: 3, name: "concerts", count: 4, categoryImg: "concerts.jpg"},
      {id: 4, name: "theatre", count: 4, categoryImg: "theatre.jpg"},
      {id: 5, name: "Industrial Exhibitions", count: 7, categoryImg: "industrialExhibitions.jpg"},
      {id: 6, name: "Cultural Exhibitions", count: 2, categoryImg: "culturalExhibitions.jpg"}
    ];

    return (
        <div className="categories-page">
          <h2 className={'categories-header'}>upcoming events in Ukraine</h2>
          <div className='categories-container'>
            <Link className='link-to-all-events' to='/events/all'> See all events </Link>
            {categories.map(cat => <Link className='link' to={'/events/' + cat.id}><Category category={cat}/></Link>)}
          </div>
        </div>

    )
  }
}

export default Categories;