import React, {Component} from 'react';
import '../css/profile.css'
import "../constants/ApiSettings.js"
import {connect} from "react-redux";
import {loadPurchaceList} from "../actions/purchaceActions";
import dataMap from "../constants/ApiSettings";

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
        const {purchaseState} = this.props;
        return (
            <ul>
                <li>
                    <p>1</p>
                </li>
                <div>
                    {purchaseState[0] && purchaseState.map(p =>
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
        ///******
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
