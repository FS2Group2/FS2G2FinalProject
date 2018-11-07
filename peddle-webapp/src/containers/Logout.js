import React, {Component} from 'react';
import '../css/Login.css'
import {changeUser, setLoggedIn} from "../actions/userActions";
import {loadWishList} from "../actions/wishListActions";
import connect from "react-redux/es/connect/connect";
import {loadPurchaceList} from "../actions/purchaceActions";
import {
  addAccommodationToCart,
  addEventToCart,
  addTransferFromEventToCart,
  addTransferToEventToCart
} from "../actions/cartActions";
import {Link} from "react-router-dom";

class Logout extends Component {

  logout = () => {
    const {
      history, setLoggedIn, changeUser, clearWishList, clearPurchaseList,
      addEventToCart, addAccommodationToCart, addTransferToEventToCart, addTransferFromEventToCart
    } = this.props;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('logged');
    localStorage.removeItem('usr');
    localStorage.removeItem('uid');
    setLoggedIn(false);

    setTimeout(() => {
      history.push('/login');
      changeUser({});
      setLoggedIn(false);
      clearWishList();
      clearPurchaseList();
      addEventToCart({});
      addAccommodationToCart({});
      addTransferToEventToCart({});
      addTransferFromEventToCart({});
    }, 2000);
  };

  render() {

    return (
      <div>
        <div className="about-page-root">
          {!this.props.userState.loggedIn ? <p className='logout-msg'>Good buy,
              {this.props.userState.currentUser.name}! Waiting for you again!</p> :
            <div>
              <p className="logout-msg">Are you sure you want to quit?</p>
              <div className="button-group">
                <Link  to={'/'}><button className="btn logout-btn">Cancel</button></Link>
                <input type="button" className="btn logout-btn" value={'Log out'} onClick={() => this.logout()}/>
              </div>

            </div>}
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  userState: state.userReducer
});

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: isLogged => {
      dispatch(setLoggedIn(isLogged))
    },
    changeUser: user => {
      dispatch(changeUser(user))
    },
    clearWishList: () => {
      dispatch(loadWishList([]))
    },
    clearPurchaseList: () => {
      dispatch(loadPurchaceList([]))
    },
    addEventToCart: (event) => dispatch(addEventToCart(event)),
    addAccommodationToCart: (accommdation) => dispatch(addAccommodationToCart(accommdation)),
    addTransferToEventToCart: (transfer) => dispatch(addTransferToEventToCart(transfer)),
    addTransferFromEventToCart: (transfer) => dispatch(addTransferFromEventToCart(transfer))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);