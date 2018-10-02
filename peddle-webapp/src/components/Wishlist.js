import React, {Component} from 'react';
import '../css/Wishlist.css'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {eventImgPath} from "../constants/ApiSettings";
import {wishListRemove} from "../constants/queryTypes";
import {fetchDataFromApi} from "../actions/fetchDataActions";

class Wishlist extends Component {

  removeEventFromWishList = (id) => {
    const {fetchDataFromApi, currentUser} = this.props;
    let query = {
      userId: currentUser.id,
      eventId: id
    };
    fetchDataFromApi(wishListRemove, query)
  };

  render() {
    const {wishListState} = this.props;
    return (
      <div className="wishlist-list">
        <div className="wishlist-list-titles ">
          <div className="element-title element-name">
            <span>Name</span>
          </div>
          <div className="element-title element-city">
            <span>City</span>
          </div>
          <div className="element-title element-date">
            <p>Date</p>
          </div>
          <div className="element-title element-sum">
            <span>$</span>
          </div>
        </div>

        {wishListState[0] && wishListState.map(w =>
          <div className="wishlist-list-element">
            <div className="element-name">
              <button className="btn-item-remove" onClick={()=>this.removeEventFromWishList(w.id)}> </button>
              <Link to={'event/' + w.id}>
                <img src={eventImgPath + w.eventExtraPhoto} alt="" className="element-name-img"/>
              </Link>
              <Link className='element-name-link' to={'event/' + w.id}>
                <span>{w.name}</span></Link>
            </div>
            <div className="element-city">
              <span>{w.cityName}</span>
            </div>
            <div className="element-date">
              <p>{new Date(w.date).toLocaleDateString()}</p>
            </div>
            <div className="element-sum">
              <span>{'$' + w.price}</span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wishListState: state.wishListReducer,
    currentUser: state.userReducer.currentUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromApi: (queryType, query) => dispatch(fetchDataFromApi(queryType, query))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
