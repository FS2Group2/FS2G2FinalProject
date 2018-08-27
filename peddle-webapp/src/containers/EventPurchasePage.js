import React, {Component, Fragment} from 'react';
import '../css/eventPurchase.css';
import dataMap from "../constants/ApiSettings";
import EventInfo from "../components/EventInfo";
import Accommodations from "../components/Accommodations";
import Transfers from "../components/Transfers";
import PurchaseSummary from "../components/PurchaseSummary";


class EventPurchasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.eventId,
      error: null,
      isLoaded: false,
      event: {}
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
              })
            },

            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            }
        );
  };

  render() {
    return (
        <Fragment>
          <div className='event-purchase-page'>
            <div className='event-extra-container'>
              <EventInfo event={this.state.event}/>
            </div>
            <div className='accommodation-container'>
              <Accommodations/>
            </div>
            <div className='transfer-container transfer-to'>
              <Transfers transferHeader='transfer to:'/>
            </div>
            <div className='transfer-container transfer-from'>
              <Transfers transferHeader='transfer from:'/>
            </div>
            <div className='purchase-summary'>
              <PurchaseSummary/>
            </div>
          </div>


        </Fragment>
    );
  }
}

export default EventPurchasePage;