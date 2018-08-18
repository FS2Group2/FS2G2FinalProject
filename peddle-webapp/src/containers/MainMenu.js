import React, {Component} from 'react';
import '../css/main-menu.css';
import Nav from '../components/Nav';
import mainMenuLinks from '../constants/app-settings';

import '../css/main-menu.css';

class MainMenu extends Component {
  render() {
    return (
        <div className="menu">
          <Nav navStyle='main-menu' navLinks={mainMenuLinks}/>
        </div>
    );
  }
}

export default MainMenu;