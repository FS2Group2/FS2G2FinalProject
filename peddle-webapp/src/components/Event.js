import React, {Component} from 'react';
import '../css/event.css';
import {categoryIconPath, eventImgPath, iconPath} from '../constants/ApiSettings'
import {connect} from "react-redux";

class Event extends Component {
  render() {

    const e = this.props.theEvent;
    const wishlist = this.props.wishList;

    let inWishes = wishlist.some(w => w.id === e.id);

    let eventDate = new Date(e.date);
    let imgPath = eventImgPath + e.eventExtraPhoto;
    let iconCatPath = `${categoryIconPath + e.categoryName.replace(/ /g, '_').toLowerCase()}.svg`;


    return (
      <div className='event-item'>
        <h2 className='event-item-name'>{e.name}</h2>
        <img src={iconCatPath} className={'icon'} alt="" title={e.categoryName}/>
        <div className='event-item-img-container'>
          <img className='event-item-img' src={imgPath} alt="event-img"/>
          {inWishes && <img src={iconPath + 'star_full.svg'} className={'star-icon-event'} alt=""/>}
        </div>
        <p className='event-item-date'>{eventDate.toLocaleDateString()}</p>
        <p className='event-item-city'>{e.cityName}</p>
        <h3 className='event-item-price'>${e.price}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishList: state.wishListReducer
  }
};

export default connect(mapStateToProps)(Event);