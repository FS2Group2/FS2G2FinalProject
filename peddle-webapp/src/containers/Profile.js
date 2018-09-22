import React, {Component} from 'react';
import ProfileDetails from "../components/ProfileDetails";
import connect from "react-redux/es/connect/connect";
import {Link, Route, Switch} from "react-router-dom";
import MyPurchases from "../components/MyPurchases";
import Wishlist from "../components/Wishlist";

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
                  <div className="tablink active-link">My wishlist </div>
              </Link>
              <Link to={path + '/purchases'} className="link-to-list">
                  <div className="tablink">My purchases </div>
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