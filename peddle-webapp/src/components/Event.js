import React, {Component} from 'react';
import '../css/event.css';
import {categoryIconPath, eventImgPath, iconPath} from '../constants/ApiSettings'
import {connect} from "react-redux";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {wishListAdd} from "../constants/queryTypes";

class Event extends Component {

  addEventToWishList = (eId) => {
    const {fetchDataFromApi, currentUser, isLogged} = this.props;
    let query = {
      userId: currentUser.id,
      eventId: eId
    };
    if (isLogged) fetchDataFromApi(wishListAdd, query);
  };


  render() {

    const e = this.props.theEvent;
    const wishlist = this.props.wishList;

    let inWishes = wishlist.some(w => w.id === e.id);

    let eventDate = new Date(e.date);
    let imgPath =  ~e.eventExtraPhoto.indexOf('http') ? (e.eventExtraPhoto) : (eventImgPath +e.eventExtraPhoto);
    // let imgPath = eventImgPath + e.eventExtraPhoto;


    // let iconCatPath = `${categoryIconPath + e.categoryName.replace(/ /g, '_').toLowerCase()}.svg`;
    let iconCatPath = categoryIconPath + e.categoryIcon;


    return (
      <div className='event-item'>
        <h2 className='event-item-name'>{e.name}<img src={iconCatPath} className={'icon'} alt="category" title={e.categoryName}/></h2>

        <div className='event-item-img-container'>
          <img className='event-item-img' src={imgPath} alt="event-img"/>
          {inWishes && <img src={iconPath + 'star_full.svg'} className={'star-icon-event'} alt="category"/>}
          {!inWishes &&
          <img src={iconPath + 'star.svg'} className={'empty-star-icon-event'} onClick={() => this.addEventToWishList(e.id)}
               alt="category"/>}
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
    wishList: state.wishListReducer,
    currentUser: state.userReducer.currentUser,
    isLogged: state.userReducer.loggedIn,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromApi: (queryType, query) => dispatch(fetchDataFromApi(queryType, query))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);