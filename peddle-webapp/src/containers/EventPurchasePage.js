import React, {Component, Fragment} from 'react';
import '../css/eventPurchase.css';
import EventInfo from "../components/EventInfo";
import Accommodations from "../components/Accommodations";
import Transfers from "../components/Transfers";
import {connect} from "react-redux";
import {
  setCityForTransferFromEvent,
  setCityForTransferToEvent,
  setDatesForTransferFromEvent,
  setDatesForTransferToEvent,
  setEventCity
} from "../actions/transferActions";
import {fetchDataFromApi, fetchEventInfo} from "../actions/fetchDataActions";
import {wishListAdd, wishListRemove} from "../constants/queryTypes";
import Message from "../components/Message";
import * as ReactDOM from "react-dom";
import {
  addAccommodationToCart,
  addEventToCart,
  addTransferFromEventToCart,
  addTransferToEventToCart
} from "../actions/cartActions";
import {loadAccommodations} from "../actions/accommodationActions";
import Preloader from "./Preloader";


class EventPurchasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.eventId
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

  addEventToBasket = () => {
    this.props.addEventToCart(this.props.currentEventInfo);
    this.renderMsg('event "' + this.props.currentEventInfo.name + '" add to card', 2500);
  };

  addAccommodationToBasket = (acc) => {
    this.props.addAccommodationToCart(acc);
    this.renderMsg('reservation at "' + acc.name + '" add to card', 2000);
  };

  addTransferToToBasket = (tr) => {
    this.props.addTransferToEventToCart(tr);
    this.renderMsg(
      'reservation at ' + tr.transportTypeName +
      ' from ' + tr.fromCityName +
      ' to ' + tr.toCityName +
      ' # ' + tr.number +
      ' add to card', 2500);
  };

  addTransferFromToBasket = (tr) => {
    this.props.addTransferFromEventToCart(tr);
    this.renderMsg(
      'reservation at ' + tr.transportTypeName +
      ' from ' + tr.fromCityName +
      ' to ' + tr.toCityName +
      ' # ' + tr.number +
      ' add to card', 2500);
  };

  addEventToWishList = () => {
    const {fetchDataFromApi, currentUser, isLogged} = this.props;
    let query = {
      userId: currentUser.id,
      eventId: this.state.eventId
    };
    isLogged ? fetchDataFromApi(wishListAdd, query) :
      this.renderMsg("To save event to your wish list you should log in", 2550);
  };

  removeEventFromWishList = () => {
    const {fetchDataFromApi, currentUser} = this.props;
    let query = {
      userId: currentUser.id,
      eventId: this.state.eventId
    };
    fetchDataFromApi(wishListRemove, query)
  };

  renderMsg(msg, t) {
    const elem = (<Message message={msg}/>);
    const parentDiv = document.getElementById('event-purchase');
    ReactDOM.render(elem, parentDiv);
    parentDiv.style.opacity = '1';
    parentDiv.style.display = 'block';
    setTimeout(() => {
      parentDiv.style.opacity = '0';
      parentDiv.style.display = 'none';
    }, t)
  }

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

  setTransferCityTo = (v) => this.props.setCityForTransferToEvent(v);
  setTransferCityFrom = (v) => this.props.setCityForTransferFromEvent(v);

  componentDidUpdate(prevProps) {
    const {currentUser, currentEventInfo, loadAccommodations} = this.props;
    if (prevProps.currentUser.cityName !== this.props.currentUser.cityName) {
      this.props.setCityForTransferToEvent(currentUser.cityName);
      this.props.setCityForTransferFromEvent(currentUser.cityName);
    }

    if (prevProps.isEventInfoSuccess !== this.props.isEventInfoSuccess) {
      this.props.setEventCity(currentEventInfo.cityName);
      this.props.setDatesForTransferToEvent(this.dateBeforeEvent(1), this.dateBeforeEvent(0));
      this.props.setDatesForTransferFromEvent(this.dateEventEnd(0), this.dateEventEnd(1));
      loadAccommodations(currentEventInfo.cityName);
    }
  }

  render() {
    const {
      allCities, transferProps, currentEventInfo,
      isEventInfoPending, isLoadAccommodationPending, accommodations
    } = this.props;
    return (
      <Fragment>
        <div className='event-purchase-page'>
          {isEventInfoPending ? <Preloader/> : <div className='event-extra-container'>
            <EventInfo event={currentEventInfo} add={this.addEventToBasket.bind(this)}
                       addToWishList={this.addEventToWishList.bind(this)}
                       removeFromWishList={this.removeEventFromWishList.bind(this)}/>
          </div>}

          {isLoadAccommodationPending ? <Preloader/> :
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
        </div>
        <div id='event-purchase'/>
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
    isLoadAccommodationPending: state.accommodationReducer.isLoadAccommodationPending,
    accommodations: state.accommodationReducer.accommodations,
    isEventInfoSuccess: state.eventReducer.isEventInfoSuccess,
    isEventInfoPending: state.eventReducer.isEventInfoPending
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // === CITIES ===
    setCityForTransferToEvent: (city) => dispatch(setCityForTransferToEvent(city)),
    setCityForTransferFromEvent: (city) => dispatch(setCityForTransferFromEvent(city)),
    setEventCity: (city) => dispatch(setEventCity(city)),

    loadAccommodations: (cityName) => dispatch(loadAccommodations(cityName)),
    // === DATES ===
    setDatesForTransferToEvent: (date1, date2) => dispatch(setDatesForTransferToEvent(date1, date2)),
    setDatesForTransferFromEvent: (date1, date2) => dispatch(setDatesForTransferFromEvent(date1, date2)),

    fetchEventInfo: (eventId) => dispatch(fetchEventInfo(eventId)),
    fetchDataFromApi: (queryType, query) => dispatch(fetchDataFromApi(queryType, query)),

    // === CART ACTIONS ===
    addEventToCart: (event) => dispatch(addEventToCart(event)),
    addAccommodationToCart: (accommdation) => dispatch(addAccommodationToCart(accommdation)),
    addTransferToEventToCart: (transfer) => dispatch(addTransferToEventToCart(transfer)),
    addTransferFromEventToCart: (transfer) => dispatch(addTransferFromEventToCart(transfer))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPurchasePage);
