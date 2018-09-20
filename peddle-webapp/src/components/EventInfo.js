import React, {Component} from 'react';
import {eventImgPath} from '../constants/ApiSettings'

class EventInfo extends Component {
  render() {
    const event = this.props.event;
    const{add, addToWishList}= this.props;
    return (
        <div className='event-info'>
          <div className='event-photo-container'>
            <img className='event-photo' src={eventImgPath + event.eventExtraPhoto} alt=""/>
          </div>
          <div className='event-description'>
            <p className='container-header-p'>Event Info:</p>
            <h2 className='event-info-header'>{event.name}</h2>
            <h3 className='event-info-city'>{event.cityName}</h3>
            <h3 className='event-info-date'>{new Date(event.date).toLocaleDateString()}</h3>
            <p className='event-info-p'>Duration: {event.duration} hours</p>
            <p className='event-info-p'>Description: {event.eventExtraDescription}</p>
          </div>
          <div className='event-purchase'>
            <h2 className='event-price'>Price: ${event.price}</h2>
            <div className="event-actions-buttons">
              <input type="button" className={'btn add-to-wishlist'} value={'Add to wish list'} onClick={addToWishList}/>
              <input type="button" className='btn add-to-cart' value='Add to cart' onClick={add}/>
            </div>

          </div>
        </div>
    )
  }

}

export default EventInfo;