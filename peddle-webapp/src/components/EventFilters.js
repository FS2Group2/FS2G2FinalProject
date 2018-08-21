import React, {Component} from 'react';

class EventFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    const {updateMyCity, setDateFrom, setDateTo, doFilter, resetFilter} = this.props;
    const todayDate = new Date(Date.now());
    let todayToStr = todayDate.getFullYear() + '-' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + '-' + ('0' + todayDate.getDate()).slice(-2);

    return (
        <div>
          <form id='filter-form'>
            <p className='filter-label'>City:</p>
            <select id='sc' className='filter-input' name="cityFilter"
                    onChange={() => updateMyCity(document.getElementById('sc').valueOf().value)}>
              <option selected value=''>Select city</option>
              {this.props.cities.map(c => <option value={c.name}>{c.name}</option>)}
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
                   onClick={() => resetFilter()} onMouseDown={() => resetFilter()}
                   onMouseUp={() => document.getElementById('filter-form').reset()}/>
          </form>
        </div>

    );
  }
}

export default EventFilters;