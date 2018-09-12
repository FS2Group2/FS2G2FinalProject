import React, {Component} from 'react';
import '../css/profile.css'
import "../constants/ApiSettings.js"
import {connect} from "react-redux";
import {loadPurchaceList} from "../actions/purchaceActions";
import dataMap, {authHeaders} from "../constants/ApiSettings";

class MyPurchases extends Component {

  loadPurchaseList() {
    let reqParam = {
      method: 'GET',
      headers: authHeaders
    };
    const url = dataMap.purchace + this.props.userState.currentUser.id;
    console.log('request params:' + JSON.stringify(reqParam));
    fetch(url, reqParam)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.loadPurchaseListToStore(result)
        })
  }

  componentDidMount() {
    this.loadPurchaseList();
  }

  render() {
    return (
      <ul>
        <li>My purchases:</li>
      </ul>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    userState: state.userReducer,
    purchase: state.purchaseReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadPurchaseListToStore: data => {
      dispatch(loadPurchaceList(data))
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPurchases);
