import React, {Component} from 'react';

class EventFilters extends Component {
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    var cities = [];

    return (
        <div>
            <p className='filter-label'>City:</p>
            <select className='filter-input' name="cityFilter" onChange={this.handleChange}>
              <option selected value=''>Select city</option>
              {this.props.cities.map(c => <option value={c}>{c}</option>)}
            </select>
          <form>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <input type='button' formAction='submit' value='Select'/>
            <input type='button' formAction='reset' value='Reset' />
          </form>
        </div>

    );
  }
}

export default EventFilters;