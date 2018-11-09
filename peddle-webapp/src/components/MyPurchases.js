import React, {Component, Fragment} from 'react';
import '../css/MyPurchase.css';
import "../constants/ApiSettings.js"
import dataMap from "../constants/ApiSettings";
import {connect} from "react-redux";
import {loadPurchaceList} from "../actions/purchaceActions";

class MyPurchases extends Component {

  loadPurchaseList() {
    let reqParam = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    const url = dataMap.purchace + this.props.userState.currentUser.id;
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

  showDetail(p) {
    let elStyle = document.getElementById(p).style;
    elStyle.visibility === "visible" ? elStyle.visibility = "hidden" : elStyle.visibility = "visible";
    elStyle.height === "100%" ? elStyle.height = '0' : elStyle.height = '100%';
    document.getElementById('btn' + p).className === "btn-down" ?
      document.getElementById('btn' + p).className = "btn-up" :
      document.getElementById('btn' + p).className = "btn-down"
    ;
  }

  render() {
    const {purchase} = this.props;
    return (
      <div className="purchase-list">
        {!purchase[0] ?
          <h3>You have not made a purchase on our site. It's time to do it: select an event to your liking</h3> :
          <div className="purchase-list-titles">
            <div className="element-title purchased-item-name">
              <h4 className='element-title-name'>Name</h4>
            </div>
            <div className="element-title purchased-item-city">
              <h4>City</h4>
            </div>
            <div className="element-title purchased-item-date">
              <h4>Event date</h4>
            </div>
            <div className="element-title purchased-item-accommodation">
              <h4>Accommodation</h4>
            </div>
            <div className="element-title purchased-item-transfer-to">
              <h4>Transfer forward</h4>
            </div>
            <div className="element-title purchased-item-transfer-from">
              <h4>Transfer backward</h4>
            </div>
            <div className="element-title purchased-item-sum">
              <h4>total</h4>
            </div>
          </div>}

        {purchase[0] && purchase.map(p =>
          <Fragment>
            <div className="purchase-list-element" key={p.id}>
              <div className="purchased-item-name">
                <button className='btn-down' id={'btn' + p.id} onClick={() => this.showDetail(p.id)}></button>
                <span onClick={() => this.showDetail(p.id)}>{p.eventName}</span>
              </div>
              <div className="purchased-item-city">
                <span>{p.eventCityName}</span>
              </div>
              <div className="purchased-item-date">
                <p>{new Date(p.eventDate).toLocaleDateString()}</p>
              </div>
              <div className="purchased-item-accommodation">
                {p.accommodationName && <img src="/img/icons/check.svg" alt="" className="item-present"/>}
              </div>
              <div className="purchased-item-transfer-to">
                {p.transfertoTransporttypeName && <img src="/img/icons/check.svg" alt="" className="item-present"/>}
              </div>
              <div className="purchased-item-transfer-from">
                {p.transferfromTransporttypeName && <img src="/img/icons/check.svg" alt="" className="item-present"/>}
              </div>
              <div className="purchased-item-sum">
                <span>{'$' + p.summ}</span>
              </div>
            </div>

            <div className="purchased-item-detail" id={p.id}>
              <p>Event: {p.eventName}, {p.eventCityName},
                date: {new Date(p.eventDate).toLocaleDateString()}, ${p.eventPrice}</p>
              {p.accommodationName &&
              <p>{'Hotel reserved: ' + p.accommodationName + ', ' + p.accommodationCityName + '     $' + p.accommodationPrice}</p>}

              {p.transfertoTransporttypeName &&
              <p>{p.transfertoTransporttypeName + ' #' + p.transfertoNumber + ' from '
              + p.transfertoFromcityName + ' to ' + p.transfertoTocityName + ', depart. time ' +
              new Date(p.transfertoDeparttime).toLocaleString() + ',      $' + p.transferToPrice}</p>}

              {p.transferfromTransporttypeName &&
              <p>{p.transferfromTransporttypeName + ' #' + p.transferfromNumber + ' from '
              + p.transferfromFromcityName + ' to ' + p.transferfromTocityName + ', depart. time ' +
              new Date(p.transferfromDeparttime).toLocaleString() + ',     $' + p.transferfromPrice}</p>}
              {p.translatorId &&
              <p>Services of a guide interpreter, language: {p.translatorLanguage}</p>}
              {p.photographer &&
              <p>Pre-ordered photographer service.</p>}
            </div>
          </Fragment>
        )}
      </div>
    )

  }
}

//
// id:1
// eventId:1
// eventName:"Gapchinska"
// eventCityName:"Kyiv"
// eventDate:"2018-10-15T08:54:33.187+0000"
// eventPrice:0
// categoryId:null
// categoryName:null
// transfertoId:1
// transfertoTransporttypeName:"Fly"
// transfertoFromcityName:"Kyiv"
// transfertoTocityName:"Lviv"
// transfertoNumber:3
// transfertoDeparttime:"2018-09-30T08:00:00.000+0000"
// transferToPrice:210
// transferfromId:2
// transferfromTransporttypeName:"Fly"
// transferfromFromcityName:"Lviv"
// transferfromTocityName:"Kyiv"
// transferfromNumber:4
// transferfromDeparttime:"2018-10-01T01:00:00.000+0000"
// transferfromPrice:168
// accommodationId:2
// accommodationName:"Atlantic Garden Resort"
// accommodationCityName:"Kyiv"
// accommodationPrice:620
// summ:998


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