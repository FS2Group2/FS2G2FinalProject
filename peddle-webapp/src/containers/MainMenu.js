import React, {Component} from 'react';
import '../css/main-menu.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {iconPath, userPhotoPath} from "../constants/ApiSettings";

class MainMenu extends Component {
  render() {
    const {cart} = this.props;
    // let userAvatar = '';

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
              <img className={'logo-main-menu'} src="/img/logo.png" alt=""/>
            </Link>
            <Link className="main-menu-link" to={'/'}>Events</Link>
          </div>

          <div className="menu-right">
            {userState.loggedIn &&
            <Link className="main-menu-link" to={'/profile'}>
              <div className="main-menu-item-container">
                <p className="main-menu-user-p">{userState.currentUser.name}</p>
                <div className="menu-user-photo-container">
                  <img className='main-menu-user-photo' src={userPhotoPath + userState.currentUser.profilePhoto}
                       alt=""/>
                </div>
              </div>
            </Link>}

            <Link className="main-menu-link" to={'/cart'}>
              <div className="main-menu-item-container">
                {/*<p className="main-menu-cart-p">*/}
                  {/*Cart*/}
                {/*</p>*/}
                <img className='menu-cart-img' src={iconPath+'cart-menu.svg'} alt=""/>
                <p className='menu-cart-sum'>{cartSum}</p>
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