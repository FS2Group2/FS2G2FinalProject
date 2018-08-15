import React, {Component} from 'react';

class EventFilters extends Component{
  render(){
    return(
        <div>
          <form action="">
            <p className='filter-label'>City:</p>
            <input className='filter-input' type="text"/>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
            <p className='filter-label'>Date from:</p>
            <input className='filter-input' type="text"/>
          </form>

        </div>

    );
  }
}

export default EventFilters;