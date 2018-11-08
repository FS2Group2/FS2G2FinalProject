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
import Logout from "./containers/Logout";
import Registration from "./components/Registration";
import ForgotPass from "./containers/ForgotPass";
import ChangePass from "./components/ChangePass";
import Cart from "./containers/Cart";

class App extends Component {
  render() {
    return (

      <div className="App">
          <MainMenu/>
        <div className="container">
          <div className='page-content'>

            <Switch>
              <Route exact path='/events' component={Events}/>
              <Route exact path='/' component={Categories}/>
              <Route exact path='/about' component={About}/>
              <Route path='/profile' component={Profile}/>
              <Route path='/cart' component={Cart}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/logout' component={Logout}/>
              <Route exact path='/event/:eventId' component={EventPurchasePage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/registration/:token" component={Registration}/>
              <Route exact path="/forgotPass" component={ForgotPass}/>
              <Route path="/changePass/:token" component={ChangePass}/>
              <Route path='/' component={PageNotFound}/>
            </Switch>
          </div>
          <LoadListsComponent/>
        </div>
        <div className="footer-container">
          <AppFooter/>
        </div>
      </div>
    );
  }
}

export default App;
