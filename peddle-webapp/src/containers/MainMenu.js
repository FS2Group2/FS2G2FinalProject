import React, {Component} from 'react';
import '../css/main-menu.css';
import Nav from '../components/Nav';
import {Switch, Route} from 'react-router-dom';
import mainMenuLinks from '../constants/app-settings';
import Events from '../containers/Events';
import About from '../containers/About';
import Profile from '../containers/Profile';
import Login from '../containers/Login';
import '../css/main-menu.css';

class MainMenu extends Component {
  render() {
    return (
        <div className="menu">
          <Nav navStyle='main-menu' navLinks={mainMenuLinks}/>
          <Switch>
            <Route exact path='/' component={Events}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/login' component={Login}/>
            <Route path='/' component={()=><h1>404</h1>}/>
          </Switch>

        </div>
    );
  }
}

export default MainMenu;