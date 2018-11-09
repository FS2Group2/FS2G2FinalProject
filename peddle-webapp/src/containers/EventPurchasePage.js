import React, {Component, Fragment} from 'react';
import '../css/eventPurchase.css';
import EventInfo from "../components/EventInfo";
import Accommodations from "../components/Accommodations";
import Transfers from "../components/Transfers";
import {connect} from "react-redux";
import {
  loadTransfersBackward,
  loadTransfersForward,
  resetDaysDelta,
  setCityForTransferFromEvent,
  setCityForTransferToEvent,
  setDatesForTransferFromEvent,
  setDatesForTransferToEvent,
  setDaysAfterEventDec,
  setDaysAfterEventInc,
  setDaysBeforeEventDec,
  setDaysBeforeEventInc,
  setEventCity
} from "../actions/transferActions";
import {fetchDataFromApi, fetchEventInfo} from "../actions/fetchDataActions";
import {wishListAdd, wishListRemove} from "../constants/queryTypes";
import Message from "../components/Message";
import * as ReactDOM from "react-dom";
import {
  addAccommodationToCart,
  addEventToCart,
  addPhotographerToCart,
  addTransferFromEventToCart,
  addTransferToEventToCart,
  addTranslatorToCart
} from "../actions/cartActions";
import {loadAccommodations} from "../actions/accommodationActions";
import Preloader from "./Preloader";
import PreloaderMini from "./PreloaderMini";


class EventPurchasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.eventId
    }
  }

  dateEventEnd = (n) => {
    let date = new Date(this.props.currentEventInfo.date);
    const daysAfterEvent = this.props.transferProps.daysAfterEvent;
    date.setDate(date.getDate() + Math.ceil(this.props.currentEventInfo.duration / 24) + n + daysAfterEvent);
    return date.toLocaleDateString('en-GB');
  };

  dateBeforeEvent = (n) => {
    const daysBeforeEvent = this.props.transferProps.daysBeforeEvent;
    console.log(daysBeforeEvent);
    let date = new Date(this.props.currentEventInfo.date);
    date.setDate(date.getDate() - n - daysBeforeEvent);
    return date.toLocaleDateString('en-GB');
  };

  setTransferCityTo = (v) => this.props.setCityForTransferToEvent(v);
  setTransferCityFrom = (v) => this.props.setCityForTransferFromEvent(v);

  // ===== LOAD TRANSFERS ==========
  fetchTransfersForward = () => {
    const {transferProps, loadTransfersForward} = this.props;
    let cityFrom, cityTo, dateFrom, dateTo;
    cityFrom = transferProps.cityTransferDepartToEvent;
    cityTo = transferProps.eventCity;
    dateFrom = transferProps.dateTransferToEvent1;
    dateTo = transferProps.dateTransferToEvent2;
    const query = {
      cityFrom: cityFrom,
      cityTo: cityTo,
      dateFrom: dateFrom,
      dateTo: dateTo
    };
    if (cityFrom && cityTo && dateFrom && dateTo) loadTransfersForward(query);
  };

  fetchTransfersBackward = () => {
    const {transferProps, loadTransfersBackward} = this.props;
    let cityFrom, cityTo, dateFrom, dateTo;
    cityFrom = transferProps.eventCity;
    cityTo = transferProps.cityTransferArrivalFromEvent;
    dateFrom = transferProps.dateTransferFromEvent1;
    dateTo = transferProps.dateTransferFromEvent2;
    const query = {
      cityFrom: cityFrom,
      cityTo: cityTo,
      dateFrom: dateFrom,
      dateTo: dateTo
    };
    if (cityFrom && cityTo && dateFrom && dateTo) loadTransfersBackward(query);
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

  handleChange(event) {
    const {value} = event.target;
    this.props.addTranslatorToCart({guide: true, translatorId: value});
  }

  handleCheck(event) {
    const {name, checked} = event.target;
    switch (name) {
      case 'guide':
        return this.props.addTranslatorToCart({guide: checked});
      case 'photographer':
        return this.props.addPhotographerToCart(checked);
      default:
        return null;
    }
  }

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
      fetchEventInfo, resetDaysDelta
    } = this.props;

    fetchEventInfo(this.state.eventId);
    if (isLogged) {
      setCityForTransferToEvent(currentUser.cityName);
      setCityForTransferFromEvent(currentUser.cityName);
    }
    resetDaysDelta();
  };

  componentDidUpdate(prevProps) {
    const {currentUser, currentEventInfo, loadAccommodations} = this.props;

    if (prevProps.currentUser.cityName !== this.props.currentUser.cityName) {
      this.props.setCityForTransferToEvent(currentUser.cityName);
      this.props.setCityForTransferFromEvent(currentUser.cityName);
    }

    if (prevProps.transferProps.daysBeforeEvent !== this.props.transferProps.daysBeforeEvent) {
      this.props.setDatesForTransferToEvent(this.dateBeforeEvent(1), this.dateBeforeEvent(0));
    }

    if (prevProps.transferProps.daysAfterEvent !== this.props.transferProps.daysAfterEvent) {
      this.props.setDatesForTransferFromEvent(this.dateEventEnd(0), this.dateEventEnd(1));
    }

    if (prevProps.isEventInfoSuccess !== this.props.isEventInfoSuccess) {
      this.props.setEventCity(currentEventInfo.cityName);
      this.props.setDatesForTransferToEvent(this.dateBeforeEvent(1), this.dateBeforeEvent(0));
      this.props.setDatesForTransferFromEvent(this.dateEventEnd(0), this.dateEventEnd(1));
      loadAccommodations(currentEventInfo.cityName);
    }

    if (prevProps.transferProps.cityTransferDepartToEvent !== this.props.transferProps.cityTransferDepartToEvent ||
      prevProps.currentUser.cityName !== this.props.currentUser.cityName ||
      prevProps.transferProps.eventCity !== this.props.transferProps.eventCity ||
      prevProps.transferProps.dateTransferToEvent1 !== this.props.transferProps.dateTransferToEvent1
    ) {
      this.fetchTransfersForward()
    }

    if (prevProps.transferProps.cityTransferArrivalFromEvent !== this.props.transferProps.cityTransferArrivalFromEvent ||
      prevProps.currentUser.cityName !== this.props.currentUser.cityName ||
      prevProps.transferProps.eventCity !== this.props.transferProps.eventCity ||
      prevProps.transferProps.dateTransferFromEvent1 !== this.props.transferProps.dateTransferFromEvent1
    ) {
      this.fetchTransfersBackward()
    }
  }

  render() {
    const {
      allCities, languages, transferProps, currentEventInfo,
      isEventInfoPending, isLoadAccommodationPending, accommodations, currentUser,
      setDaysBeforeEventInc, setDaysBeforeEventDec, setDaysAfterEventInc, setDaysAfterEventDec,
      isTransfersForwardPending, isTransfersBackwardPending, translator
    } = this.props;
    return (
      <Fragment>
        <div className='event-purchase-page'>
          {isEventInfoPending ?
            <Preloader/> :
            <div className='event-extra-container'>
              <EventInfo event={currentEventInfo} add={this.addEventToBasket.bind(this)}
                         addToWishList={this.addEventToWishList.bind(this)}
                         removeFromWishList={this.removeEventFromWishList.bind(this)}/>
            </div>}

          {isLoadAccommodationPending ?
            <PreloaderMini/> :
            <div className='accommodation-container'>
              <Accommodations accommodations={accommodations} city={currentEventInfo.cityName}
                              addA={this.addAccommodationToBasket.bind(this)}/>
            </div>
          }

          {/*=======TRANSFER TO EVENT CITY=== (==>>>)*/}

          <div className='transfer-container'>
            <div className="select-transfer-options">
              {!currentUser.cityName ?
                <p className='transfer-input-label'>Select a city for transfer or sign in to use your default city (the
                  default city must be set in your profile):</p> :
                <p className='transfer-input-label'>You may select a city for transfer or use your default city:</p>
              }

              <select id='transferCityTo' className='filter-input select-city-input' name="cityFilter"
                      onChange={() => this.setTransferCityTo(document.getElementById('transferCityTo').valueOf().value)}>
                <option value={currentUser.cityName || ''}>{currentUser.cityName || 'Select city'}</option>
                {allCities[0] && allCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>

              <div className="select-transfer-days">
                <p className="transfer-input-label">Departure date:</p>
                <button className="btn-days-inc"
                        onClick={() => {
                          setDaysBeforeEventInc()
                        }}> -
                </button>
                <p className="transfer-input-label transfer-date">
                  {transferProps.dateTransferToEvent1 + ' to ' + transferProps.dateTransferToEvent2}</p>
                <button className="btn-days-inc" onClick={() => {
                  if (transferProps.daysBeforeEvent) setDaysBeforeEventDec()
                }} disabled={!transferProps.daysBeforeEvent}> +
                </button>
              </div>
            </div>

            {isTransfersForwardPending ? <PreloaderMini/> :
              <Transfers cityFrom={transferProps.cityTransferDepartToEvent}
                         cityTo={transferProps.eventCity}
                         transfers={transferProps.transfersForward}
                         addTransfer={this.addTransferToToBasket.bind(this)}/>}
          </div>

          {/*=======TRANSFER FROM EVENT CITY==== (<<<==)*/}

          <div className='transfer-container'>
            <div className="select-transfer-options">
              {!currentUser.cityName ?
                <p className='transfer-input-label'>Select a city for transfer or sign in to use your default city (the
                  default city must be set in your profile):</p> :
                <p className='transfer-input-label'>You may select a city for transfer or use your default city:</p>
              }

              <select id='transferCityFrom' className='filter-input select-city-input' name="cityFilter"
                      onChange={() => this.setTransferCityFrom(document.getElementById('transferCityFrom').valueOf().value)}>
                <option value={currentUser.cityName || ''}>{currentUser.cityName || 'Select city'}</option>
                {allCities[0] && allCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>

              <div className="select-transfer-days">
                <p className="transfer-input-label">Departure date:</p>
                <button className="btn-days-inc"
                        onClick={() => {
                          if (transferProps.daysAfterEvent) setDaysAfterEventDec()
                        }} disabled={!transferProps.daysAfterEvent}> -
                </button>
                <p className="transfer-input-label transfer-date">
                  {transferProps.dateTransferFromEvent1 + ' to ' + transferProps.dateTransferFromEvent2}</p>
                <button className="btn-days-inc" onClick={setDaysAfterEventInc}> +
                </button>
              </div>
            </div>

            {isTransfersBackwardPending ? <PreloaderMini/> :
              <Transfers cityFrom={transferProps.eventCity}
                         cityTo={transferProps.cityTransferArrivalFromEvent}
                         transfers={transferProps.transfersBackward}
                         addTransfer={this.addTransferFromToBasket.bind(this)}/>}
          </div>
        </div>
        <div id='event-purchase'/>
        <div className="additional-service-container">
          <div>
            <p className='additional-service-p'>You can also order the services of a guide interpreter. Service is paid
              separately.</p>
            <input type="checkbox" name={'guide'} id={'guide'}
                   onChange={this.handleCheck.bind(this)}
                   checked={this.props.translator.guide}/>
            <label htmlFor="guide" className={'login-input-label'}>interpreter guide services</label>
            {translator.guide && <select name="language" id="language" className='filter-input select-city-input'
                                         onChange={this.handleChange.bind(this)} value={this.props.translator.translatorId ||'0'}>
              <option value='0'>Select language</option>
              {languages[0] && languages.map(l => <option key={l.id} value={l.id}>{l.language}</option>)}
            </select>}
          </div>
          <div>
            <p className='additional-service-p'>We can also provide the services of a photographer - as a separate photo
              session,
              as well as accompanying you to your chosen location.</p>
            <input type="checkbox" name={'photographer'} id={'photographer'}
                   onChange={this.handleCheck.bind(this)} checked={this.props.photographer}/>
            <label htmlFor="photographer" className={'login-input-label'}>Photographer service</label>
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
    languages: state.fillListsReducer.languages,
    transferProps: state.transferReducer,
    isLoadAccommodationPending: state.accommodationReducer.isLoadAccommodationPending,
    accommodations: state.accommodationReducer.accommodations,
    isEventInfoSuccess: state.eventReducer.isEventInfoSuccess,
    isEventInfoPending: state.eventReducer.isEventInfoPending,
    isTransfersForwardPending: state.transferReducer.isTransfersForwardPending,
    isTransfersBackwardPending: state.transferReducer.isTransfersBackwardPending,
    translator: state.cartReducer.translator,
    photographer: state.cartReducer.photographer
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
    setDaysBeforeEventInc: () => dispatch(setDaysBeforeEventInc()),
    setDaysBeforeEventDec: () => dispatch(setDaysBeforeEventDec()),
    setDaysAfterEventInc: () => dispatch(setDaysAfterEventInc()),
    setDaysAfterEventDec: () => dispatch(setDaysAfterEventDec()),
    resetDaysDelta: () => dispatch(resetDaysDelta()),

    fetchEventInfo: (eventId) => dispatch(fetchEventInfo(eventId)),
    fetchDataFromApi: (queryType, query) => dispatch(fetchDataFromApi(queryType, query)),

    // ====== TRANSFER ACTIONS ============
    loadTransfersForward: (query) => dispatch(loadTransfersForward(query)),
    loadTransfersBackward: (query) => dispatch(loadTransfersBackward(query)),
    // === CART ACTIONS ===
    addEventToCart: (event) => dispatch(addEventToCart(event)),
    addAccommodationToCart: (accommodation) => dispatch(addAccommodationToCart(accommodation)),
    addTransferToEventToCart: (transfer) => dispatch(addTransferToEventToCart(transfer)),
    addTransferFromEventToCart: (transfer) => dispatch(addTransferFromEventToCart(transfer)),
    addTranslatorToCart: (translator) => dispatch(addTranslatorToCart(translator)),
    addPhotographerToCart: (photographer) => dispatch(addPhotographerToCart(photographer))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPurchasePage);
