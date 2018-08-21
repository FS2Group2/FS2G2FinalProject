import React, {Component} from 'react';

class EventFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    const {updateMyCity} = this.props;

    return (
        <div>
          <p className='filter-label'>City:</p>
          <select id='sc' className='filter-input' name="cityFilter"
                  onChange={() => updateMyCity(document.getElementById('sc').valueOf().value)}>
            <option selected value=''>Select city</option>
            {this.props.cities.map(c => <option value={c.name}>{c.name}</option>)}
          </select>
          <form>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <input type='button' formAction='submit' value='Select'/>
            <input type='button' formAction='reset' value='Reset'/>
          </form>
        </div>

    );
  }
}

export default EventFilters;