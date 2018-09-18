import React, {Component} from 'react';
import '../css/event.css';
import {categoryIconPath, eventImgPath} from '../constants/ApiSettings'

class Event extends Component {
  render() {

    const e = this.props.theEvent;
    let eventDate = new Date(e.date);
    let imgPath = eventImgPath+e.eventExtraPhoto;
    let iconPath = `${categoryIconPath + e.categoryName.replace(/ /g, '_').toLowerCase()}.svg`;


    return (
        <div className='event-item'>
          <h2 className='event-item-name'>{e.name}</h2>
          <img src={iconPath} className={'icon'} alt="" title={e.categoryName}/>
          <div className='event-item-img-container'>
            <img className='event-item-img' src={imgPath} alt="event-img"/>
          </div>
          <p className='event-item-date'>{eventDate.toLocaleDateString()}</p>
          <p className='event-item-city'>{e.cityName}</p>
          <h3 className='event-item-price'>${e.price}</h3>
        </div>
    );
  }
}

export default Event;