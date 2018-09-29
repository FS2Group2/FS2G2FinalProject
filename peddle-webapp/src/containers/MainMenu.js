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

    const {userState} = this.props;

    return (
      <div className="menu">
        <div className='main-menu'>
          <li className="main-menu-li">
            <Link className="main-menu-link logo-main-menu-link" to={'/'}>
              <img className={'logo-main-menu'} src="/img/logo.png" alt=""/>
            </Link>
          </li>
          <li className="main-menu-li"><Link className="main-menu-link" to={'/'}>Events</Link></li>
          <li className="main-menu-li"><Link className="main-menu-link" to={'/about'}>About project</Link></li>
          {userState.loggedIn &&
          <li className="main-menu-li"><Link className="main-menu-link" to={'/profile'}>Profile</Link></li>}
          {userState.loggedIn ?
          <li className="main-menu-li"><Link className="main-menu-link" to={'/logout'}>Logout</Link></li>:
          <li className="main-menu-li"><Link className="main-menu-link" to={'/login'}>Login</Link></li>
          }
          <li className="main-menu-li">
            <Link className="main-menu-link" to={'/cart'}>Cart</Link>
            <p className='menu-cart-sum'>{cartSum}</p>
          </li>
          {/*{mainMenuLinks.map(link =>*/}
          {/*link.text &&*/}
          {/*<li className="main-menu-li" key={link.url}>*/}
          {/*<Link className="main-menu-link" to={link.url}>*/}
          {/*{link.text}*/}
          {/*<p className='menu-cart-sum'>{link.sum}</p>*/}
          {/*</Link>*/}
          {/*</li>*/}
          {/*)}*/}
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