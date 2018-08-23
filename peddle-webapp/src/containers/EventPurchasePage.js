import React, {Component, Fragment} from 'react';
import '../css/eventPurchasePage.css';
import dataMap from "../constants/ApiSettings";


class EventPurchasePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventId: this.props.match.params.eventId,
      error: null,
      isLoaded: false,
      event:{}
    }
  }

  componentDidMount() {
    const urlEvent = dataMap.event+this.state.eventId;

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
          <p>Current event is event #{this.props.match.params.eventId}</p>
          <div className='event-purchase-page'>
            <div className='event-extra-container'>

            </div>
          </div>


        </Fragment>
    );
  }
}

export default EventPurchasePage;