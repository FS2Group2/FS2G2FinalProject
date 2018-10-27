import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {
  filterReset,
  setFilterCategory,
  setFilterCity,
  setFilterDateFrom,
  setFilterDateTo
} from "../actions/filterActions";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {Link} from "react-router-dom";

class EventFilters extends Component {

  setDateStart(ds) {
    this.props.setFilterDateFrom(new Date(ds).toLocaleDateString('en-GB'));
  };

  setDateFin(df) {
    this.props.setFilterDateTo(new Date(df).toLocaleDateString('en-GB'));
  };

  render() {
    const {categories, cities, filter, setFilterCategory, setFilterCity, filterReset, filterStyle} = this.props;

    function dayToStr(day) {
      return day[6] + day[7] + day[8] + day[9] + '-' + day[3] + day[4] + '-' + day[0] + day[1];
    }

    return (
      <div>
        <form className={'filter' + filterStyle} id='filter-form'>
          {
            (filterStyle !== '-horizontal') &&
            <Fragment>
              <p className={'filter-label' + filterStyle}>Category:</p>
              <select id='cat' className={'filter-input'+filterStyle} value={filter.category} name="categoryFilter"
                      onChange={() => setFilterCategory(document.getElementById('cat').valueOf().value)}>
                <option value='0'>All</option>
                {categories[0] && categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </Fragment>
          }

          <div className={'filter-block' + filterStyle}>
            <p className={'filter-label' + filterStyle}>City:</p>
            <select id='sc' className={'filter-input'+filterStyle} name="cityFilter" value={filter.city}
                    onChange={() => setFilterCity(document.getElementById('sc').valueOf().value)}>
              <option value=''>Select city</option>
              {cities[0] && cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div className={'filter-block' + filterStyle}>
            <p className={'filter-label' + filterStyle}>Date from:</p>
            <input className={'filter-input'+filterStyle} type="date" id='date-from'
                   defaultValue={dayToStr(filter.dateStart)}
                   min={dayToStr(filter.dateStart)}
                   onChange={() => this.setDateStart(document.getElementById('date-from').valueOf().value)}/>
          </div>

          <div className={'filter-block' + filterStyle}>
            <p className={'filter-label' + filterStyle}>Date to:</p>
            <input className={'filter-input'+filterStyle} type="date" id='date-to'
                   defaultValue={dayToStr(filter.dateFin)}
                   min={dayToStr(filter.dateStart)}
                   onChange={() => this.setDateFin(document.getElementById('date-to').valueOf().value)}/>
          </div>

          <div className={'filter-block' + filterStyle}>
            <Link to={'/events'}><input className={'filter-input'+filterStyle + ' btn'+filterStyle} type='button' formAction='submit'
                                        value='Apply filter'/>
            </Link>
            <input className={'btn'+filterStyle + ' filter-input'+filterStyle} type='button' formAction='reset' value='Reset'
                   onClick={() => filterReset()} onMouseUp={() => document.getElementById('filter-form').reset()}/>
          </div>

        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.fillListsReducer.cities,
    categories: state.fillListsReducer.categories,
    filter: state.filterReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilterCategory: (categoryId) => {
      dispatch(setFilterCategory(categoryId))
    },
    setFilterCity: (city) => {
      dispatch(setFilterCity(city))
    },
    setFilterDateFrom: (date) => {
      dispatch(setFilterDateFrom(date))
    },
    setFilterDateTo: (date) => {
      dispatch(setFilterDateTo(date))
    },
    filterReset: () => {
      dispatch(filterReset())
    },
    fetchDataFromApi: (queryType, query) => {
      dispatch(fetchDataFromApi(queryType, query))
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EventFilters);