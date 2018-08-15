import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Event from '../components/Event';
import EventFilters from '../components/EventFilters';
import '../css/eventsPage.css';

class Events extends Component {
  render() {
    return (
        <div>
          <h2 className='events-header'>Current events</h2>
          <div className='events-page'>
            <div className='filters-container'>
              <EventFilters/>
            </div>
            <div className='events-container'>
              <Link to='/event'><Event/></Link>
              <Link to='/event'><Event/></Link>
              <Link to='/event'><Event/></Link>
              <Link to='/event'><Event/></Link>
              <Link to='/event'><Event/></Link>
              <Link to='/event'><Event/></Link>
              <Link to='/event'><Event/></Link>
            </div>
          </div>

        </div>

    );
  }
}

export default Events;