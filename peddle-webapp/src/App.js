import React, { Component } from 'react';
import './Apps.scss';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Register from './pages/Register';
//import EventInfo from './EventInfo';
import Main from "./pages/Main";
import {Route, Switch} from "react-router-dom";
import Profile from "./pages/Profile";


class App extends Component {
  render() {
    return (
        <div className="App-bg">
            <div className="App-routers">
                <div>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/recover' component={Recovery}/>
                        <Route exact path='/profile' component={Profile}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
