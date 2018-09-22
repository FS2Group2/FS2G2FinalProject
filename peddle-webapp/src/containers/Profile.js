import React, {Component} from 'react';
import ProfileDetails from "../components/ProfileDetails";
import connect from "react-redux/es/connect/connect";
import {Link, Route, Switch} from "react-router-dom";
import MyPurchases from "../components/MyPurchases";
import Wishlist from "../components/Wishlist";

function openCity(evt, Name) {
    // Declare all variables
    var i, tablinks;


    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-link", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active-link";
}

class Profile extends Component {

    render() {
    const user = this.props.userState.currentUser;
    const path = this.props.match.path;
    return (
        !user.id?
            <div>
            <p>Please, log in!</p>
            </div>
            :
        <div>
          <ProfileDetails user={user}/>
          <div className="tab">
              <Link to={path} className='link-to-list'>
                  <div className="tablink active-link" onClick={openCity(event, 'My wishlist')}>My wishlist </div>
              </Link>
              <Link to={path + '/purchases'} className="link-to-list">
                  <div className="tablink" onClick={openCity(event,'My purchase')}>My purchases </div>
              </Link>
          </div>
          <Switch>
            <Route exact path={path} component={Wishlist}/>
            <Route exact path={path + '/purchases'} component={MyPurchases}/>
          </Switch>
        </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    userState: state.userReducer
  }
};

export default connect(mapStateToProps)(Profile);