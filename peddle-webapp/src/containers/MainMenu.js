import React, {Component} from 'react';
import '../css/main-menu.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {iconPath} from "../constants/ApiSettings";

class MainMenu extends Component {
  render() {
    const {cart} = this.props;

    let cartSum = ((cart.purchasedEvent && cart.purchasedEvent.price) || 0) +
      ((cart.purchasedAccommodation && cart.purchasedAccommodation.price) || 0) +
      ((cart.purchasedTransferTo && cart.purchasedTransferTo.price) || 0) +
      ((cart.purchasedTransferFrom && cart.purchasedTransferFrom.price) || 0);

    const {userState} = this.props;

    return (
      <div className="menu">
        <div className='main-menu'>
          <div className="menu-left">
            <Link className="main-menu-link logo-main-menu-link" to={'/'}>
              <img className={'logo-main-menu'} src="/img/eventtour.png" alt=""/>
            </Link>
            <Link className="main-menu-link" to={'/'}>Events</Link>
          </div>

          <div className="menu-right">
            {userState.loggedIn &&
            <Link className="main-menu-link" to={'/profile'}>
              <div className="main-menu-item-container">
                <div className="menu-user-photo-container">
                  {userState.currentUser.profilePhoto ?
                    <img className='main-menu-user-photo' src={userState.currentUser.profilePhoto}
                         alt="ProfileAvatar"/> :
                    <img className='main-menu-user-photo'
                         src='https://s3.us-east-2.amazonaws.com/eventtour-bucket/avatars/unknown_user.png'
                         alt="ProfileAvatar"/>}
                </div>
                <p className="main-menu-user-p">{userState.currentUser.name}</p>
              </div>
            </Link>}

            <Link className="main-menu-link" to={'/cart'}>
              <div className="main-menu-item-container">
                <img className='menu-cart-img' src={iconPath + 'cart-menu.svg'} alt=""/>
                <p className='menu-cart-sum'>{cartSum && '$' + cartSum}</p>
              </div>
            </Link>

            {userState.loggedIn ?
              <Link className="main-menu-link" to={'/logout'}>Logout</Link> :
              <Link className="main-menu-link" to={'/login'}>Login</Link>
            }
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.userReducer,
  cart: state.cartReducer
});

export default connect(mapStateToProps)(MainMenu);