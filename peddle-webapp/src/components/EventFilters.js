import React, {Component} from 'react';

class EventFilters extends Component {
  render() {
    var cities = [];
    var city1 = '';

    return (
        <div>
          <form action=''>
            <p className='filter-label'>City:</p>
            <select className='filter-input' name="cityFilter">
              <option selected value=''>Select city</option>
              {this.props.cities.map(c => <option value={c}>{c}</option>)}
            </select>
          </form>
          <form>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <input type='button' formAction='submit' value='Select'/>
            <input type='button' formAction='reset' value='Reset'/>
          </form>
          <p>{city1.toString()}</p>
        </div>

    );
  }
}

export default EventFilters;