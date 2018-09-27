import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {purchaseAdd} from "../constants/queryTypes";
import Message from "./Message";
import * as ReactDOM from "react-dom";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {
  addAccommodationToCart,
  addEventToCart,
  addTransferFromEventToCart,
  addTransferToEventToCart
} from "../actions/cartActions";

class PurchaseSummary extends Component {

  totalAmount = () => {
    const {cart} = this.props;
    return (cart.purchasedEvent && cart.purchasedEvent.price || 0) +
      (cart.purchasedAccommodation && cart.purchasedAccommodation.price || 0) +
      (cart.purchasedTransferTo && cart.purchasedTransferTo.price || 0) +
      (cart.purchasedTransferFrom && cart.purchasedTransferFrom.price || 0);
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
    let query = {
      id: userState.currentUser.id,
      eventId: event.id,
      transfertoId: transferTo.id || '0',
      transferfromId: transferFrom.id || '0',
      accommodationId: accommodation.id || '0'
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
    return (
      <Fragment>
        {(event.name || accommodation.name || transferFrom.number || transferFrom.number) ?
          <div className='purchase-summary'>
            <div className="purchases">
              <p className='container-header-p'> Summary:</p>

              <div className="purchased-event">
                <div className='purchased-event-name summary-elem'>
                  <h3 className="purchased-event-header">{event.name}</h3>
                  <p>Location: {event.cityName}</p>
                </div>
                <div className="summary-elem">
                  {new Date(event.date).toLocaleString()}
                </div>
                <div className='summary-elem cost-elem'>
                  Cost: ${event.price}
                </div>
              </div>

              {accommodation.price && <div className="purchased-accommodation">
                <div className="summary-elem">
                  <p><span>Hotel: </span> {accommodation.name}</p>
                </div>
                <div className="summary-elem">
                  <p>{accommodation.minOrderTime / 24} day(s)</p>
                </div>
                <div className="summary-elem cost-elem">
                  Cost: ${accommodation.price}
                </div>
              </div>}

              {transferTo.price && <div className="purchased-transfer">
                <div className="summary-elem">
                  <p><span>Transfer to </span> {transferTo.toCityName}:</p>
                </div>
                <div className="summary-elem">
                  <p>{transferTo.transportTypeName} #{transferTo.number}</p>
                </div>
                <div className="summary-elem cost-elem">
                  Cost: ${transferTo.price}
                </div>
              </div>}

              {transferFrom.price && <div className="purchased-transfer">
                <div className="summary-elem">
                  <p><span>Transfer from </span> {transferFrom.fromCityName}:</p>
                </div>
                <div className="summary-elem">
                  <p>{transferFrom.transportTypeName} #{transferFrom.number}</p>
                </div>
                <div className="summary-elem cost-elem">
                  Cost: ${transferFrom.price}
                </div>
              </div>}

            </div>

            <div className="summary">
              <p>Total amount:</p>
              <h3 className='purchase-summary-total'>${this.totalAmount()}</h3>
              <input className={'btn add-to-cart'} type="button" value={'Purchase'}
                     onClick={() => this.savePurchase()}/>
            </div>
          </div>
          :
          <div className='purchase-summary'>
            <p>Your cart is still empty..</p>
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
    addTransferFromEventToCart: (transfer) => dispatch(addTransferFromEventToCart(transfer))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSummary);