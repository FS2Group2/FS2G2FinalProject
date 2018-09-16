import React, {Component} from 'react'
import {Link} from "react-router-dom";
import '../css/categoriesPage.css';
import Category from "../components/Category";
import {connect} from "react-redux";
import {setFilterCategory} from "../actions/filterActions";
import EventFilters from "../components/EventFilters";

class Categories extends Component {
  render() {
    const {categories, setFilterCategory} = this.props;
    setFilterCategory(0);
    return (

      <div className="categories-page">
        <h2 className={'categories-header'}>upcoming events in Ukraine</h2>
        <div>
          <div className="filter-container-horizontal">
            <EventFilters style={'-horizontal'}/>
          </div>

          <div className='categories-container'>
            <Link className='link-to-all-events' onClick={() => setFilterCategory(0)} to='/events'> See all
              events </Link>
            {categories.map(cat => <Link onClick={() => setFilterCategory(cat.id)} key={cat.id} className='link'
                                         to={'/events'}><Category category={cat}/></Link>)}
          </div>
        </div>

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.fillListsReducer.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterCategory: (categoryId) => {
      dispatch(setFilterCategory(categoryId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);