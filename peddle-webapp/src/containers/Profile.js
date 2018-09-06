import React, {Component} from 'react';
import ProfileDetails from "../components/ProfileDetails";
import connect from "react-redux/es/connect/connect";
import {Link, Route, Switch} from "react-router-dom";
import MyPurchases from "../components/MyPurchases";
import Wishlist from "../components/Wishlist";
import {loadPurchaceList} from "../actions/purchaceActions";

class Profile extends Component {
    loadPurchaceList(userId) {
        let header = new Headers();
        header.append("Content-Type", "application/JSON");
        let reqParam = {
            method: 'GET',
            headers: header
        };
        const url = dataMap.purchace + userId;
        console.log('request params:' + JSON.stringify(reqParam));
        fetch(url, reqParam)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.loadPurchaceListToStore(result)
                })
    }
    
    render() {
    const user = this.props.userState.currentUser;
    const path = this.props.match.path;
    return (
        <div>
          <ProfileDetails user={user}/>
          <div className="lists-container">
            <nav>
              <Link to={path}><div className='link-to-list'>My wishlist </div></Link>
              <Link to={path + '/purchases'}><div className='link-to-list'>My purchases </div></Link>
            </nav>
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
    userState: state.userReducer,
    purchace: state.purchaceReducer,
  }
};
const mapDispatchToProps = dispatch => {
    return {
        loadPurchaseListToStore: data => {
            dispatch(loadPurchaceList(data))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps())(Profile);