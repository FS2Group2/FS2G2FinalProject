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
import RegisterPage from "./containers/RegisterPage"
import Categories from "./containers/Categories";
import LoadListsComponent from "./components/LoadListsComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div>
            <MainMenu/>
            <Switch>
              <Route exact path='/events/:categoryId' component={Events}/>
              <Route exact path='/' component={Categories}/>
              <Route exact path='/about' component={About}/>
              <Route path='/profile' component={Profile}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/event/:eventId' component={EventPurchasePage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route path='/' component={PageNotFound}/>
            </Switch>
          </div>
          <LoadListsComponent/>
          <AppFooter/>
        </div>
      </div>
    );
  }
}

export default App;
