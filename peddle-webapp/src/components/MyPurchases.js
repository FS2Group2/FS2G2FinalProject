import React, {Component} from 'react';
import '../css/MyPurchase.css';
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
        const {purchase} = this.props;
        return (
                <div className="purchase-list">
                    <div className="purchase-list-titles">
                    <div className="element-title-name">
                        <span >Name</span>
                    </div>
                    <div className="element-title-city">
                        <span >City</span>
                    </div>
                    <div className="element-title-sum">
                        <span >$</span>
                    </div>
                    </div>
                    {purchase[0] && purchase.map(p =>
                        <div className="purchase-list-element">
                                    <div className="element-name">
                                        <span >{p.eventName}</span>
                                    </div>
                                    <div className="element-city">
                                        <span >{p.eventCityName}</span>
                                    </div>
                                    <div className="element-sum">
                                        <span >{p.summ}</span>
                                    </div>
                        </div>
                    )}
                </div>
        )

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