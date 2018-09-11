import React, {Component} from 'react';
import {categoryImgPath} from "../constants/ApiSettings";

class Category extends Component {
  render() {
    const {category} = this.props;
    return (
        <div className="category-item">
          <h3 className={'category-name'}>{category.name}</h3>
          <div className="category-img-container">
            <img src={categoryImgPath + category.photo} alt="" className="category-img"/>
          </div>
<p className="events-count">
  {category.count && category.count + ' events'}
</p>
        </div>
    )
  }
}

export default Category;