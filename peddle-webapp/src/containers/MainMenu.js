import React, {Component} from 'react';
import '../css/main-menu.css';
import Nav from '../components/Nav';
import '../css/main-menu.css';
import {connect} from "react-redux";

class MainMenu extends Component {
  render() {
    let mainMenuLinks = [
      {url: '/', text: 'Events'},
      {url: '/about', text: 'About project'},
      {url: '/profile', text: ''},
      {url: '/login', text: 'login'}
    ];
    const {userState} = this.props;
    if (userState.loggedIn) {
      mainMenuLinks[3].text = 'logout';
      mainMenuLinks[3].url = '/logout';
      mainMenuLinks[2].text = 'Profile';
    }

    return (
        <div className="menu">
          <Nav navStyle='main-menu' navLinks={mainMenuLinks}/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.userReducer
});

export default connect(mapStateToProps)(MainMenu);