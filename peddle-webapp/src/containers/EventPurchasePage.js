import React, {Component, Fragment} from 'react';
import '../css/eventPurchase.css';
import dataMap, {authHeaders} from "../constants/ApiSettings";
import EventInfo from "../components/EventInfo";
import Accommodations from "../components/Accommodations";
import Transfers from "../components/Transfers";
import PurchaseSummary from "../components/PurchaseSummary";
import {connect} from "react-redux";
import {
  setCityForTransferFromEvent,
  setCityForTransferToEvent,
  setDatesForTransferFromEvent,
  setDatesForTransferToEvent,
  setEventCity
} from "../actions/transferActions";
import {fetchDataFromApi, fetchEventInfo} from "../actions/fetchDataActions";
import {purchaseAdd, wishListAdd} from "../constants/queryTypes";


class EventPurchasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.eventId,
      error: null,
      isLoaded: false,
      // event: {},
      accommodations: [],
      // transferToEvent: [],
      // transferFromEvent: [],
      purchasedEvent: {},
      purchasedAccommodation: {},
      purchasedTransferTo: {},
      purchasedTransferFrom: {},
    }
  }

  dateEventEnd = (n) => {
    let date = new Date(this.props.currentEventInfo.date);
    date.setDate(date.getDate() + Math.ceil(this.props.currentEventInfo.duration / 24) + n);
    return date.toLocaleDateString('en-GB');
  };

  dateBeforeEvent = (n) => {
    let date = new Date(this.props.currentEventInfo.date);
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
    this.setState({purchasedEvent: this.props.currentEventInfo})
  };

  addEventToWishList = () => {
    const {fetchDataFromApi, currentUser} = this.props;
    let query = {
      userId: currentUser.id,
      eventId: this.state.eventId
    };
    fetchDataFromApi(wishListAdd, query);
    // fetchDataFromApi(wishList, '')
  };

  savePurchase = () => {
    const {currentUser, fetchDataFromApi} = this.props;
    const {
      purchasedEvent,
      purchasedAccommodation,
      purchasedTransferTo,
      purchasedTransferFrom
    } = this.state;
    let query = {
      id: currentUser.id,
      eventId: purchasedEvent.id,
      transfertoId: purchasedTransferTo.id || '0',
      transferfromId: purchasedTransferFrom.id || '0',
      accommodationId: purchasedAccommodation.id || '0'
    };
    fetchDataFromApi(purchaseAdd, query);
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
    const {
      isLogged, currentUser,
      setCityForTransferToEvent, setCityForTransferFromEvent,
      fetchEventInfo
    } = this.props;

    fetchEventInfo(this.state.eventId);
    if (isLogged) {
      setCityForTransferToEvent(currentUser.cityName);
      setCityForTransferFromEvent(currentUser.cityName);
    }
  };

  fetchAccommodations() {
    const cityName = this.props.currentEventInfo.cityName;
    let reqParam = {
      method: 'POST',
      headers: authHeaders,
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

  setTransferCityTo = (v) => this.props.setCityForTransferToEvent(v);
  setTransferCityFrom = (v) => this.props.setCityForTransferFromEvent(v);

  componentDidUpdate(prevProps) {
    const {currentUser} = this.props;
    if (prevProps.currentUser.cityName !== this.props.currentUser.cityName) {
      this.props.setCityForTransferToEvent(currentUser.cityName);
      this.props.setCityForTransferFromEvent(currentUser.cityName);
    }

    if (prevProps.isEventInfoSuccess !== this.props.isEventInfoSuccess) {
      this.props.setEventCity(this.props.currentEventInfo.cityName);
      this.props.setDatesForTransferToEvent(this.dateBeforeEvent(1), this.dateBeforeEvent(0));
      this.props.setDatesForTransferFromEvent(this.dateEventEnd(0), this.dateEventEnd(1));
      this.fetchAccommodations();
    }
  }

  render() {
    const {
      purchasedEvent, purchasedAccommodation,
      accommodations, purchasedTransferTo, purchasedTransferFrom
    } = this.state;
    const {allCities, transferProps, currentEventInfo} = this.props;
    return (
      <Fragment>
        <div className='event-purchase-page'>
          <div className='event-extra-container'>
            <EventInfo event={currentEventInfo} add={this.addEventToBasket.bind(this)}
                       addToWishList={this.addEventToWishList.bind(this)}/>
          </div>

          {currentEventInfo.cityName &&
          <div className='accommodation-container'>
            <Accommodations accommodations={accommodations} city={currentEventInfo.cityName}
                            addA={this.addAccommodationToBasket.bind(this)}/>
          </div>
          }

          {/*===> SELECT CITY FOR TRANSFER TO EVENT ===>*/}

          <div className="select-transfer-city">
            <p>Choose city for transfer or log in to use your default city:</p>
            <select id='transferCityTo' className='filter-input' name="cityFilter"
                    onChange={() => this.setTransferCityTo(document.getElementById('transferCityTo').valueOf().value)}>
              <option selected value=''>Select city</option>
              {allCities[0] && allCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          {/*=======TRANSFER TO EVENT CITY=== (==>>>)*/}

          <div className='transfer-container transfer-to'>
            <Transfers cityFrom={transferProps.cityTransferDepartToEvent}
                       cityTo={transferProps.eventCity}
                       dateFrom={transferProps.dateTransferToEvent1}
                       dateTo={transferProps.dateTransferToEvent2}
                       transferType='FORWARD'
                       addTransfer={this.addTransferToToBasket.bind(this)}/>
          </div>

          {/*===> SELECT CITY FOR TRANSFER FROM EVENT===>*/}

          <div className="select-transfer-city">
            <p>Choose city for transfer or log in to use your default city:</p>
            <select id='transferCityFrom' className='filter-input' name="cityFilter"
                    onChange={() => this.setTransferCityFrom(document.getElementById('transferCityFrom').valueOf().value)}>
              <option selected value=''>Select city</option>
              {allCities[0] && allCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          {/*=======TRANSFER FROM EVENT CITY==== (<<<==)*/}

          <div className='transfer-container transfer-from'>
            <Transfers cityFrom={transferProps.eventCity}
                       cityTo={transferProps.cityTransferArrivalFromEvent}
                       dateFrom={transferProps.dateTransferFromEvent1}
                       dateTo={transferProps.dateTransferFromEvent2}
                       transferType='BACKWARD'
                       addTransfer={this.addTransferFromToBasket.bind(this)}/>
          </div>

          {/*===PURCHASE SUMMARY===*/}

          <div>
            <PurchaseSummary event={purchasedEvent} accommodation={purchasedAccommodation}
                             transferTo={purchasedTransferTo} transferFrom={purchasedTransferFrom}
                             purchase={this.savePurchase.bind(this)}/>
          </div>
        </div>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    currentEventInfo: state.eventReducer.eventInfo,
    isLogged: state.userReducer.loggedIn,
    allCities: state.fillListsReducer.cities,
    transferProps: state.transferReducer,
    isEventInfoSuccess: state.eventReducer.isEventInfoSuccess
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // === CITIES ===
    setCityForTransferToEvent: (city) => dispatch(setCityForTransferToEvent(city)),
    setCityForTransferFromEvent: (city) => dispatch(setCityForTransferFromEvent(city)),
    setEventCity: (city) => dispatch(setEventCity(city)),
    // === DATES ===
    setDatesForTransferToEvent: (date1, date2) => dispatch(setDatesForTransferToEvent(date1, date2)),
    setDatesForTransferFromEvent: (date1, date2) => dispatch(setDatesForTransferFromEvent(date1, date2)),

    fetchEventInfo: (eventId) => dispatch(fetchEventInfo(eventId)),
    fetchDataFromApi: (queryType, query) => dispatch(fetchDataFromApi(queryType, query))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPurchasePage);