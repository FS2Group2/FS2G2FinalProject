import React, {Component} from 'react';
import {eventImgPath, iconPath} from '../constants/ApiSettings'
import {connect} from "react-redux";

class EventInfo extends Component {
  render() {
    const event = this.props.event;
    const {add, addToWishList, removeFromWishList, wishList} = this.props;
    let inWishes = wishList.some(w => w.id === event.id);
    let imgPath = event.eventExtraPhoto && (~event.eventExtraPhoto.indexOf('http') ?
      (event.eventExtraPhoto) : (eventImgPath + event.eventExtraPhoto));
    return (
      <div className='event-info'>
        <div className='event-photo-container'>
          <img className='event-photo' src={imgPath} alt=""/>
          {inWishes && <img src={iconPath + 'star_full.svg'} className={'star-icon-event-info'} alt=""/>}
        </div>
        <div className='event-description'>
          <p className='container-header-p'>Event Info:</p>
          <h2 className='event-info-header'>{event.name}</h2>
          <h3 className='event-info-city'>{event.cityName}</h3>
          <h3 className='event-info-date'>{new Date(event.date).toLocaleDateString()}</h3>
          <p className='event-info-p'><span className="event-info-p-name">Duration: </span> {event.duration} hours</p>
          <p className='event-info-p'><span
            className="event-info-p-name">Description:</span>{event.eventExtraDescription}</p>
        </div>
        <div className='event-purchase'>
          <h2 className='event-price'>Price: ${event.price}</h2>
          <div className="event-actions-buttons">
            {!inWishes ? <input type="button" className={'btn add-to-wishlist'}
                                value={'Add to wish list'} onClick={addToWishList}/> :
              <input type="button" className={'btn remove-from-wishlist'}
                     value={'Remove from wishes'} onClick={removeFromWishList}/>}
            <input type="button" className='btn add-to-cart' value='Add to cart' onClick={add}/>
          </div>

        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    wishList: state.wishListReducer
  }
};

export default connect(mapStateToProps)(EventInfo);