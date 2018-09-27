import React, {Component} from 'react';
import '../css/main-menu.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class MainMenu extends Component {
  render() {
    const {cart} = this.props;
    // let userAvatar = '';

    let cartSum = ((cart.purchasedEvent && cart.purchasedEvent.price) || 0) +
      ((cart.purchasedAccommodation && cart.purchasedAccommodation.price) || 0) +
      ((cart.purchasedTransferTo && cart.purchasedTransferTo.price) || 0) +
      ((cart.purchasedTransferFrom && cart.purchasedTransferFrom.price) || 0);

    let mainMenuLinks = [
      {url: '/', text: 'Events', sum: '', img: ''},
      {url: '/about', text: 'About project', sum: ''},
      {url: '/profile', text: '', sum: '', img: ''},
      {url: '/login', text: 'login', sum: '', img: ''},
      {url: '/cart', text: 'cart', sum: cartSum, img: ''}
    ];


    const {userState} = this.props;
    if (userState.loggedIn) {
      mainMenuLinks[3].text = 'logout';
      mainMenuLinks[3].url = '/logout';
      mainMenuLinks[2].text = 'Profile';

    }


    return (
      <div className="menu">
        <div className='main-menu'>
          {mainMenuLinks.map(link =>
            link.text &&
            <li className="main-menu-li" key={link.url}>
              <Link className="main-menu-link" to={link.url}>
                {link.text}
                <p className='menu-cart-sum'>{link.sum}</p>
              </Link>
            </li>
          )}
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