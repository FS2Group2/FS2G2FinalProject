import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/main-menu.css';

class Nav extends Component {
  render() {
    return (
        <div className={this.props.navStyle}>
          {this.props.navLinks.map(link =>
              link.text&&<li className="main-menu-li" key={link.url}>
                <Link className="main-menu-link" to={link.url}>{link.text}</Link>
              </li>
          )}
        </div>
    );
  }

}

export default Nav;
