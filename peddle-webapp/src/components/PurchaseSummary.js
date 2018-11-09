import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {purchaseAdd} from "../constants/queryTypes";
import Message from "./Message";
import * as ReactDOM from "react-dom";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {
  addAccommodationToCart,
  addEventToCart, addPhotographerToCart,
  addTransferFromEventToCart,
  addTransferToEventToCart, addTranslatorToCart
} from "../actions/cartActions";
import '../css/cart.css';
import {eventImgPath} from "../constants/ApiSettings";

class PurchaseSummary extends Component {

  totalAmount = () => {
    const {cart} = this.props;
    return ((cart.purchasedEvent && cart.purchasedEvent.price) || 0) +
      ((cart.purchasedAccommodation && cart.purchasedAccommodation.price) || 0) +
      ((cart.purchasedTransferTo && cart.purchasedTransferTo.price) || 0) +
      ((cart.purchasedTransferFrom && cart.purchasedTransferFrom.price) || 0);
  };

  savePurchase = () => {
    const {isLogged} = this.props;
    isLogged ? this.doPurchase() :
      this.renderMsg("To save your purchases you should log in", 2550)
  };

  doPurchase() {
    const {
      userState, fetchDataFromApi, addEventToCart, addAccommodationToCart,
      addTransferToEventToCart, addTransferFromEventToCart
    } = this.props;
    const event = this.props.cart.purchasedEvent;
    const accommodation = this.props.cart.purchasedAccommodation;
    const transferTo = this.props.cart.purchasedTransferTo;
    const transferFrom = this.props.cart.purchasedTransferFrom;
    const translator = this.props.cart.translator;
    const photographer = this.props.cart.photographer;
    let query = {
      id: userState.currentUser.id,
      eventId: event.id,
      transfertoId: transferTo.id || '0',
      transferfromId: transferFrom.id || '0',
      accommodationId: accommodation.id || '0',
      translatorId: (translator.guide && translator.translatorId) || '0',
      photographer: photographer
    };
    fetchDataFromApi(purchaseAdd, query);
    this.renderMsg('Your purchases were successfully saved.', 2000);
    setTimeout(() => {
      addEventToCart({});
      addAccommodationToCart({});
      addTransferToEventToCart({});
      addTransferFromEventToCart({});
    }, 3000);
  }

  renderMsg(msg, t) {
    const elem = (<Message message={msg}/>);
    const parentDiv = document.getElementById('msg-container');
    ReactDOM.render(elem, parentDiv);
    parentDiv.style.opacity = '1';
    parentDiv.style.display = 'block';
    setTimeout(() => {
      parentDiv.style.opacity = '0';
      parentDiv.style.display = 'none';
    }, t)
  }

  render() {
    const event = this.props.cart.purchasedEvent;
    const accommodation = this.props.cart.purchasedAccommodation;
    const transferTo = this.props.cart.purchasedTransferTo;
    const transferFrom = this.props.cart.purchasedTransferFrom;
    const translator = this.props.cart.translator;
    const photographer = this.props.cart.photographer;
    let imgPath = event.eventExtraPhoto && (~event.eventExtraPhoto.indexOf('http') ?
      (event.eventExtraPhoto) : (eventImgPath + event.eventExtraPhoto));
    return (
      <Fragment>
        {(event.name || accommodation.name || transferFrom.number || transferFrom.number) ?
          <Fragment>
            <h3 className='cart-header'> Your purchase:</h3>
            <div className='purchase-summary'>
              <div className="purchases">

                {event.name &&
                <Fragment>
                  <h3 className="purchased-item-header">Your event:</h3>
                  <div className="purchased-event">
                    <div className= "purchased-event-photo">
                      <button className="btn-item-remove" onClick={()=>this.props.addEventToCart({})}></button>
                      <img src={imgPath} alt="" className="element-name-img"/>
                    </div>
                    <div className='purchased-event-name '>
                      <h3 className="purchased-event-header">{event.name}</h3>
                    </div>
                    <div className="summary-elem">
                      <p>Location: {event.cityName}</p>
                    </div>
                    <div className="summary-elem">
                      {new Date(event.date).toLocaleString()}
                    </div>
                    <div className='summary-elem cost-elem'>
                      Cost: ${event.price}
                    </div>
                  </div>
                </Fragment>}


                {accommodation.price &&
                <Fragment>
                  <h3 className="purchased-item-header">Reserved accommodation in {event.cityName}:</h3>
                  <div className="purchased-accommodation">
                    <div className="summary-elem summary-elem-name first-elem">
                      <button className="btn-item-remove" onClick={()=>this.props.addAccommodationToCart({})}></button>
                      <p className='purchased-item-h3'>
                        <span className='item-elem-name'>Hotel: </span> {accommodation.name}</p>
                    </div>
                    <div className="summary-elem">
                      <p>{accommodation.minOrderTime / 24} day(s)</p>
                    </div>
                    <div className="summary-elem cost-elem">
                      Cost: ${accommodation.price}
                    </div>
                  </div>
                </Fragment>}

                {transferTo.price &&
                <Fragment>
                  <h3 className="purchased-item-header">Transfer to {transferTo.toCityName}:</h3>
                  <div className="purchased-transfer">
                    <div className="summary-elem first-elem">
                      <button className="btn-item-remove" onClick={()=>this.props.addTransferToEventToCart({})}></button>
                      <p>{transferTo.transportTypeName} #{transferTo.number}</p>
                    </div>
                    <div className="summary-elem">
                      <p><span className='item-elem-name'>City depart.: </span>{transferTo.fromCityName}</p>
                    </div>
                    <div className="summary-elem">
                      <p><span className='item-elem-name'>City arrival: </span>{transferTo.toCityName}</p>
                    </div>
                    <div className="summary-elem transfer-duration">
                      <p>
                        <span className='item-elem-name'>Depart.time: </span>
                        {new Date(transferTo.departTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="summary-elem">
                      <p><span className='item-elem-name'>in way: </span>{transferTo.duration} h</p>
                    </div>
                    <div className="summary-elem cost-elem">
                      Cost: ${transferTo.price}
                    </div>
                  </div>
                </Fragment>
                }

                {transferFrom.price && <Fragment>
                  <h3 className="purchased-item-header">Transfer to {transferFrom.toCityName}:</h3>
                  <div className="purchased-transfer">
                    <div className="summary-elem first-elem">
                      <button className="btn-item-remove" onClick={()=>this.props.addTransferFromEventToCart({})}></button>
                      <p>{transferFrom.transportTypeName} #{transferFrom.number}</p>
                    </div>
                    <div className="summary-elem">
                      <p><span className='item-elem-name'>City depart.: </span>{transferFrom.fromCityName}</p>
                    </div>
                    <div className="summary-elem">
                      <p><span className='item-elem-name'>City arrival: </span>{transferFrom.toCityName}</p>
                    </div>
                    <div className="summary-elem transfer-duration">
                      <p>
                        <span className='item-elem-name'>Depart.time: </span>
                        {new Date(transferFrom.departTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="summary-elem">
                      <p><span className='item-elem-name'>in way: </span>{transferFrom.duration} h</p>
                    </div>
                    <div className="summary-elem cost-elem">
                      Cost: ${transferFrom.price}
                    </div>
                  </div>
                </Fragment>}
                {translator.guide && <div>
                  <button className="btn-item-remove" onClick={()=>this.props.addTranslatorToCart({})}></button>
                  <p className="additional-service-header">Guide service pre-ordered</p>
                </div>}
                {photographer && <div>
                 <button className="btn-item-remove" onClick={()=>this.props.addPhotographerToCart(false)}></button>
                 <p className="additional-service-header">Service of photographer pre-ordered</p>
               </div>}

              </div>

              <div className="summary">
                <p className='summary-total-header'>Total amount:</p>
                <h3 className='purchase-summary-total'>${this.totalAmount()}</h3>
                <button className={'btn-purchase'}
                        onClick={() => this.savePurchase()}>Purchase</button>
              </div>
            </div>
          </Fragment>

          :
          <div className='purchase-summary'>
            <h3 className='cart-header'>Your cart is still empty..</h3>
          </div>
        }
        <div id='msg-container'></div>
      </Fragment>


    )
  }

}

const mapStateToProps = state => ({
  userState: state.userReducer,
  cart: state.cartReducer,
  isLogged: state.userReducer.loggedIn,

});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromApi: (queryType, query) => dispatch(fetchDataFromApi(queryType, query)),
    addEventToCart: (event) => dispatch(addEventToCart(event)),
    addAccommodationToCart: (accommdation) => dispatch(addAccommodationToCart(accommdation)),
    addTransferToEventToCart: (transfer) => dispatch(addTransferToEventToCart(transfer)),
    addTransferFromEventToCart: (transfer) => dispatch(addTransferFromEventToCart(transfer)),
    addTranslatorToCart: (translator) => dispatch(addTranslatorToCart(translator)),
    addPhotographerToCart: (photographer) => dispatch(addPhotographerToCart(photographer))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSummary);