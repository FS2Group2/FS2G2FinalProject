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
    }
  }

  componentDidMount() {
    const urlEvent = dataMap.event + this.state.eventId;

    fetch(urlEvent)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                event: result
              },()=>(this.fetchAccomodations()) )
            },

            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            }
        )
  };

  fetchAccomodations() {
    const header = new Headers();
    header.append("Content-Type", "application/JSON");
    const cityName = this.state.event.cityName;
    let reqParam = {
      method: 'POST',
      headers: header,
      body: ''
    };

    const url = dataMap.accommodations + cityName;
    console.log(url);
    console.log('request params:' + JSON.stringify(reqParam));
    fetch(url, reqParam)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                accommodations: result
              })
            },

            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            }
        );
  }

  fetchTransfer(cityFrom, cityTo,dateTo, dateFrom) {
    const header = new Headers();
    header.append("Content-Type", "application/JSON");
    const cityName = this.state.event.cityName;
    let reqParam = {
      method: 'POST',
      headers: header,
      body: ''
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
                accommodations: result
              })
            },

            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            }
        );
  }

  render() {
    const eventCity = this.state.event.cityName;
    const userCity = this.props.currentUser.cityName;
    return (
        <Fragment>
          <div className='event-purchase-page'>
            <div className='event-extra-container'>
              <EventInfo event={this.state.event}/>
            </div>
            <div className='accommodation-container'>
              <Accommodations accommodations={this.state.accommodations}/>
            </div>
            <div className='transfer-container transfer-to'>
              <Transfers cityFrom = {userCity} cityTo = {eventCity} />
            </div>
            <div className='transfer-container transfer-from'>
              <Transfers cityFrom = {eventCity} cityTo = {userCity} />
            </div>
            <div className='purchase-summary'>
              <PurchaseSummary/>
            </div>
          </div>


        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer
  }
};

export default connect(mapStateToProps)(EventPurchasePage);