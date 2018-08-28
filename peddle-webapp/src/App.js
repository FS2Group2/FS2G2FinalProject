import React, {Component} from 'react';
import './css/App.css';
import MainMenu from './containers/MainMenu';
import {Route, Switch} from "react-router-dom";
import Events from "./containers/Events";
import About from "./containers/About";
import Profile from "./containers/Profile";
import Login from "./containers/Login";
import EventPurchasePage from "./containers/EventPurchasePage";
import PageNotFound from "./containers/PageNotFound";
import AppFooter from "./containers/AppFooter";

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="container">
            <div>
              <MainMenu/>
              <Switch>
                <Route exact path='/' component={Events}/>
                <Route exact path='/about' component={About}/>
                <Route path='/profile' component={Profile}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/event/:eventId' component={EventPurchasePage}/>
                <Route path='/' component={PageNotFound}/>
              </Switch>
            </div>

            <AppFooter/>
          </div>
        </div>
    );
  }
}

export default App;
