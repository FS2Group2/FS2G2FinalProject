import React, { Component } from 'react';
import '../styles/Headers.css'

class Header extends Component {
    render(){
        return(
            <div className="Header-main">
                <nav className="Header-menu">
                    <ul className="Header-list">
                            <li className="header-menu-component">Events</li>
                            <li className="header-menu-component">Companies</li>
                            <li className="header-menu-component">Accomodation</li>
                            <li className="header-menu-component">Transfer</li>
                            <li className="header-menu-component">Log In</li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Header;