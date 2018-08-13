import React, {Component} from 'react';

class EventFilters extends Component {
  render() {
    var cities = [];

    return (
        <div>
          <form action="">
            <p className='filter-label'>City:</p>
            <select className='filter-input' name="city">
              <option disabled>Select city</option>
              <option></option>
            </select>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <input type='button' formAction='submit' value='Select'></input>
          </form>

        </div>

    );
  }
}

export default EventFilters;