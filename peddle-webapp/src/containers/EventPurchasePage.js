import React, {Component, Fragment} from 'react';
import '../css/eventPurchase.css';
import dataMap from "../constants/ApiSettings";
import EventInfo from "../components/EventInfo";
import Accommodations from "../components/Accommodations";
import Transfers from "../components/Transfers";
import PurchaseSummary from "../components/PurchaseSummary";
import {connect} from "react-redux";


class EventPurchasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.eventId,
      error: null,
      isLoaded: false,
      event: {},
      accommodations: [],
      transferToEvent: [],
      transferFromEvent: [],
      purchasedEvent: {},
      purchasedAccommodation: {},
      purchasedTransferTo: {},
      purchasedTransferFrom: {}
    }
  }

  dateEventEnd = (n) => {
    let date = new Date(this.state.event.date);
    date.setDate(date.getDate() + Math.ceil(this.state.event.duration / 24) + n);
    return date.toLocaleDateString('en-GB');
  };

  dateBeforeEvent = (n) => {
    let date = new Date(this.state.event.date);
    date.setDate(date.getDate() - n);
    return date.toLocaleDateString('en-GB');
  };

  resultError = (error) => {
    this.setState({
      isLoaded: true,
      error
    })
  };

  addEventToBasket = () => {
    this.setState({purchasedEvent: this.state.event})
  };

  addAccommodationToBasket = (acc) => {
    this.setState({purchasedAccommodation: acc})
  };

  addTransferToToBasket = (tr) => {
    this.setState({purchasedTransferTo: tr})
  };

  addTransferFromToBasket = (tr) => {
    this.setState({purchasedTransferFrom: tr})
  };

  componentDidMount() {
    const urlEvent = dataMap.event + this.state.eventId;

    fetch(urlEvent)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                event: result
              })
            }, this.resultError
        )
        .then(() => (this.fetchAccommodations()))
        .then(() => {
          this.fetchTransferToEvent(
              this.dateBeforeEvent(1),
              this.dateBeforeEvent(0)
          )
        })
        .then(() => {
          this.fetchTransferFromEvent(
              this.dateEventEnd(0),
              this.dateEventEnd(1)
          )
        })
  };

  fetchAccommodations() {
    const header = new Headers();
    header.append("Content-Type", "application/JSON");
    const cityName = this.state.event.cityName;
    let reqParam = {
      method: 'POST',
      headers: header,
      body: ''
    };

    const url = dataMap.accommodations + cityName;
    fetch(url, reqParam)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                accommodations: result
              })
            }, this.resultError
        );
  }

  fetchTransferToEvent(dateFrom, dateTo) {
    const header = new Headers();
    const query = {
      cityFrom: this.props.currentUser.cityName,
      cityTo: this.state.event.cityName,
      dateFrom: dateFrom,
      dateTo: dateTo
    };
    header.append("Content-Type", "application/JSON");
    let reqParam = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(query)
    };

    const url = dataMap.transfer;
    console.log(url);
    console.log('request params:' + JSON.stringify(reqParam));
    fetch(url, reqParam)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                transferToEvent: result
              })
            }, this.resultError
        )
  }

  fetchTransferFromEvent(dateFrom, dateTo) {
    const header = new Headers();
    const query = {
      cityTo: this.props.currentUser.cityName,
      cityFrom: this.state.event.cityName,
      dateFrom: dateFrom,
      dateTo: dateTo
    };
    header.append("Content-Type", "application/JSON");
    let reqParam = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(query)
    };
    const url = dataMap.transfer;
    // console.log(url);
    // console.log('request params:' + JSON.stringify(reqParam));
    fetch(url, reqParam)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                transferFromEvent: result
              })
            }, this.resultError
        );
  }

  render() {
    // debugger
    const eventCity = this.state.event.cityName;
    const userCity = this.props.currentUser.cityName;
    const {purchasedEvent, purchasedAccommodation, purchasedTransferTo, purchasedTransferFrom} = this.state;

    return (
        <Fragment>
          <div className='event-purchase-page'>
            <div className='event-extra-container'>
              <EventInfo event={this.state.event} add={this.addEventToBasket.bind(this)}/>
            </div>

            <div className='accommodation-container'>
              <Accommodations accommodations={this.state.accommodations} city={eventCity}
                              addA={this.addAccommodationToBasket.bind(this)}/>
            </div>

            <div className='transfer-container transfer-to'>
              <Transfers cityFrom={userCity} cityTo={eventCity} transfers={this.state.transferToEvent}
                         addTransfer={this.addTransferToToBasket.bind(this)}/>
            </div>

            <div className='transfer-container transfer-from'>
              <Transfers cityFrom={eventCity} cityTo={userCity} transfers={this.state.transferFromEvent}
                         addTransfer={this.addTransferFromToBasket.bind(this)}/>
            </div>

            <div>
              <PurchaseSummary event={purchasedEvent} accommodation={purchasedAccommodation}
                               transferTo={purchasedTransferTo} transferFrom={purchasedTransferFrom}/>
            </div>
          </div>

        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser
  }
};

export default connect(mapStateToProps)(EventPurchasePage);