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
    let wishlistFlag = this.props.match.isExact;
    let wishTab = wishlistFlag ? 'tablink active-link' : 'tablink';
    let purchTab = !wishlistFlag ? 'tablink active-link' : 'tablink';
    return (
        !user.id?
            <div>
            <p>Please, log in!</p>
            </div>
            :
        <div className='page-content'>
          <ProfileDetails/>
          <div className="tab">
              <Link to={path} className='link-to-list'>
                  <div className={wishTab}>My wishlist </div>
              </Link>
              <Link to={path + '/purchases'} className="link-to-list">
                  <div className={purchTab}>My purchases </div>
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