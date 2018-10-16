import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadTransfersBackward, loadTransfersForward} from "../actions/transferActions";

class Transfers extends Component {

  arrivalTime = (dTime, duration) => {
    let t = new Date(dTime);
    t.setHours(t.getHours() + duration);
    return t;
  };

  render() {
    const {addTransfer, cityFrom, cityTo, transfers} = this.props;

    return (
      <div className='transfers'>
        <p className='container-header-p'>Transfer from {cityFrom} to {cityTo}</p>
        {transfers[0] && transfers.map(t =>
          <div key={t.id} className='transfer-item'>
            <div className='transportTypeName'>
              <p>
                <span className='transfer-item-header'>Type: </span> {t.transportTypeName}
              </p>
            </div>
            <div className='transfer-time'>
              <p><span className='transfer-item-header'>Depart: </span>{new Date(t.departTime).toLocaleString()}</p>
            </div>
            <div className='transfer-time'>
              <p><span
                className='transfer-item-header'>Arrival: </span>{this.arrivalTime(t.departTime, t.duration).toLocaleString()}
              </p>
            </div>

            <div className='transfer-duration'>
              <p>
                <span className='transfer-item-header'>Travel time: </span>{t.duration}h
              </p>
            </div>
            <div className='depart-city'>
              <p>
                <span className='transfer-item-header'>Depart. city: </span>{t.fromCityName}
              </p>
            </div>
            <div className='arrival-city'>
              <p>
                <span className='transfer-item-header'>Arriv. city: </span>{t.toCityName}
              </p>
            </div>
            <div className='transfer-number'>
              <p>
                <span className='transfer-item-header'> #: </span>{t.number}
              </p>
            </div>
            <div className='transfer-price'>
              <p>
                <span className='transfer-item-header'>Ticket price: </span>${t.price}
              </p>
            </div>
            <input type="button" className='btn purchase-btn transfer-btn' value='Buy ticket'
                   onClick={() => addTransfer(t)}/>
          </div>
        )}
      </div>
    )
  }
}

const
  mapStateToProps = (state) => {
    return {
      isLogged: state.userReducer.loggedIn,
      loggedUser: state.userReducer,
      transferProps: state.transferReducer,
      currentEventInfo: state.eventReducer.eventInfo
    }
  };

const
  mapDispatchToProps = (dispatch) => {
    return {
      loadTransfersForward: (query) => dispatch(loadTransfersForward(query)),
      loadTransfersBackward: (query) => dispatch(loadTransfersBackward(query))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);