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
    const imgPath = event => event.eventExtraPhoto && (~event.eventExtraPhoto.indexOf('http') ?
      (event.eventExtraPhoto) : (eventImgPath + event.eventExtraPhoto));

    return (
      <div className="wishlist-list">
        {(!wishListState[0] && !this.props.listPending) ?
          <h3>Your wish list is empty, but you can always add a few events to it</h3> :
          <div className="wishlist-list-titles ">
            <div className="element-title element-name">
              <h4 className='element-title-name'>Name</h4>
            </div>
            <div className="element-title element-city">
              <h4>City</h4>
            </div>
            <div className="element-title element-date">
              <h4>Date</h4>
            </div>
            <div className="element-title element-sum">
              <h4 className="element-title">$</h4>
            </div>
          </div>}

        {wishListState[0] && wishListState.map(w =>
          <div className="wishlist-list-element" key={w.id}>
            <div className="element-name">
              <button className="btn-item-remove" onClick={() => this.removeEventFromWishList(w.id)}></button>
              <Link to={'event/' + w.id}>
                <img src={imgPath(w)} alt="" className="element-name-img"/>
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
    currentUser: state.userReducer.currentUser,
    listPending: state.fetchDataReducer.isFetchPending
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromApi: (queryType, query) => dispatch(fetchDataFromApi(queryType, query))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
