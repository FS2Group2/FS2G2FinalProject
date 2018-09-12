import React, {Component} from 'react'
import {Link} from "react-router-dom";
import '../css/categoriesPage.css';
import Category from "../components/Category";
import {connect} from "react-redux";

class Categories extends Component {
  render() {
    const {categories} = this.props;

    return (
        <div className="categories-page">
          <h2 className={'categories-header'}>upcoming events in Ukraine</h2>
          <div className='categories-container'>
            <Link className='link-to-all-events' to='/events/all'> See all events </Link>
            {categories.map(cat => <Link key={cat.id} className='link' to={'/events/' + cat.id}><Category category={cat}/></Link>)}
          </div>
        </div>

    )
  }
}

const mapStateToProps = (state) =>{
return{
  categories: state.fillListsReducer.categories
}
};

export default connect(mapStateToProps)(Categories);