import React, {Component} from 'react'
import {Link} from "react-router-dom";
import '../css/categoriesPage.css';
import Category from "../components/Category";
import {connect} from "react-redux";
import {filterReset, setFilterCategory} from "../actions/filterActions";
import EventFilters from "../components/EventFilters";
import {eventImgPath} from "../constants/ApiSettings";
import Preloader from "./Preloader";

class Categories extends Component {

  componentDidMount(){
    this.props.filterReset();
  }

  render() {
    const {categories, setFilterCategory, topEvents, isFetchPending} = this.props;
    setFilterCategory(0);
    const imgPath = event => event.eventExtraPhoto && (~event.eventExtraPhoto.indexOf('http') ?
      (event.eventExtraPhoto) : (eventImgPath + event.eventExtraPhoto));

    return (
      <div className="categories-page">


        {topEvents[0] &&
        <div className="top-events-container">
          <h3 className="top-events-container-header">Top events</h3>

          <div className="events-line">
            {topEvents.map((event) =>
              <Link to={'/event/' + event.id} title={event.name} className={'link-to-top-event'}>
                <div className="event-thumbnail-container">
                  <img src={imgPath(event)} className={'event-thumbnail'} alt=""/>
                </div>
              </Link>
            )}
          </div>

        </div>
        }

        <h2 className={'categories-header'}>Upcoming events</h2>
        <div>
          {/*==== HORIZONTAL FILTER ======*/}
          <div className="filter-container-horizontal">
            <EventFilters filterStyle={'-horizontal'}/>
          </div>

          {/*==== CATEGORIES LIST ======*/}
          {(!categories[0] && isFetchPending) ? <Preloader/> :
            <div className='categories-container'>
              <Link className='link-to-all-events' onClick={() => setFilterCategory(0)} to='/events'> See all
                events </Link>
              {categories.map(cat => <Link onClick={() => setFilterCategory(cat.id)} key={cat.id} className='link'
                                           to={'/events'}><Category category={cat}/></Link>)}
            </div>
          }

        </div>

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.fillListsReducer.categories,
    topEvents: state.fillListsReducer.topEvents,
    isFetchPending: state.fetchDataReducer.isFetchPending
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterCategory: (categoryId) => {
      dispatch(setFilterCategory(categoryId))
    },
    filterReset: () => {
      dispatch(filterReset())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);