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
                    {purchase[0] && purchase.map(p =>
                        <div className="purchase-list-element">
                            <div className="purchase-element-name-section">
                            <p className="test">{p.eventName}</p>
                            </div>
                            <div className="purchase-element-city-section">
                            <p className="test">{p.eventCityName}</p>
                            </div>
                            <div className="purchase-element-sum-section">
                            <p className="test">{p.summ}</p>
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