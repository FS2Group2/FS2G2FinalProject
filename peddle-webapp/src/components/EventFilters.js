import React, {Component} from 'react';
import {connect} from "react-redux";

class EventFilters extends Component {
  render() {
    const {cities, updateMyCity, setDateFrom, setDateTo, doFilter, resetFilter, selectCategory, categories} = this.props;
    const todayDate = new Date(Date.now());
    let todayToStr = todayDate.getFullYear() + '-' +
        ('0' + (todayDate.getMonth() + 1)).slice(-2) + '-' + ('0' + todayDate.getDate()).slice(-2);
    return (
        <div>
          <form id='filter-form'>
            <p className='filter-label'>Category:</p>
            <select id='cat' className='filter-input' defaultValue={'Select category'} value='0' name="categoryFilter"
                    onChange={() => selectCategory(document.getElementById('cat').valueOf().value)}>
              <option  >Select category</option>
              {categories[0] && categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>

           <p className='filter-label'>City:</p>
            <select id='sc' className='filter-input' name="cityFilter"
                    onChange={() => updateMyCity(document.getElementById('sc').valueOf().value)}>
              <option selected value=''>Select city</option>
              {cities[0] && cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>

            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="date" id='date-from' defaultValue={todayToStr} min={todayToStr}
                   onChange={() => setDateFrom(document.getElementById('date-from').valueOf().value)}/>

            <p className='filter-label'>Date to:</p>
            <input className='filter-input' type="date" id='date-to' min={todayToStr}
                   onChange={() => setDateTo(document.getElementById('date-to').valueOf().value)}/>

            <input className='filter-input btn' type='button' formAction='submit' value='Apply filter'
                   onClick={() => doFilter()}/>
            <input className='filter-input btn' type='button' formAction='reset' value='Reset'
                   onClick={() => resetFilter()} onMouseUp={() => document.getElementById('filter-form').reset()}/>
          </form>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.fillListsReducer.cities,
    categories: state.fillListsReducer.categories
  }
};


export default connect(mapStateToProps)(EventFilters);