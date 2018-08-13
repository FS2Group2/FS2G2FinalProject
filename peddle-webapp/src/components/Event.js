import React, {Component} from 'react';
import '../css/event.css'

class Event extends Component {
  render() {
    const e = this.props.theEvent;
    var eventDate = new Date(e.date);
    var imgPath = '/img/' + ((e.id % 5) + 1) + '.jpg';


    return (
        <div className='event-item'>
          <h2 className='event-item-name'>{e.name}</h2>
          <div className='event-item-img-container'>
            <img className='event-item-img' src={imgPath} alt="event-img"/>
          </div>
          <p className='event-item-date'>{eventDate.toLocaleDateString()}</p>
          <p className='event-item-city'>{e.city}</p>
          <h3 className='event-item-price'>${e.price}</h3>
        </div>
    );
  }
}

export default Event;