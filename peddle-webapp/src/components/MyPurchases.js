import React, {Component} from 'react';
import '../css/profile.css'
import "../constants/ApiSettings.js"
import {connect} from "react-redux";
import {loadPurchaceList} from "../actions/purchaceActions";
import dataMap, {authHeaders} from "../constants/ApiSettings";

class MyPurchases extends Component {

    loadPurchaseList() {
        let header = new Headers();
        header.append("Content-Type", "application/JSON");
        let reqParam = {
            method: 'GET',
            headers: header
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
        const {purchase} = this.props;
        return (
            <ul>
                <li>
                    <p>1</p>
                </li>
                <div>
                    {purchase[0] && purchase.map(p =>
                        <div>
                            <p>{p.eventName}</p>
                            <p>{p.cityName}</p>
                            <p>{p.eventDate}</p>
                            <p>___</p>
                        </div>
                    )}
                </div>
            </ul>
        )
    }
    
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
