import React, {Component} from 'react';
import {categoryImgPath} from "../constants/ApiSettings";

class Category extends Component {
  render() {
    const {category} = this.props;
    return (
        <div className="category-item">
          <h3 className={'category-name'}>{category.name}</h3>
          <div className="category-img-container">
            <img src={categoryImgPath + category.categoryImg} alt="" className="category-img"/>
          </div>

        </div>
    )
  }
}

export default Category;