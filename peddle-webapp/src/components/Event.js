import React, {Component} from 'react';
import '../css/event.css'

class Event extends Component {
  render() {
    return (
        <div className='event-item'>
          <h2 className='event-item-name'>Event name</h2>
          <img className='event-item-img' src="/img/1.jpg" alt="event-img"/>
          <p className='event-item-date'>event date</p>
          <h3 className='event-item-price'>$150</h3>
        </div>
    );
  }
}

export default Event;