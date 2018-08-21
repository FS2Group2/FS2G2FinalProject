import React, {Component} from 'react';
// import Preloader from "./Preloader";

class EventPage extends Component {
  render() {
    return (
        <div>

        <h2>In this page being purchse event and transfer with accomodation</h2>
        <p>Current event is event #{this.props.match.params.eventId}</p>
        </div>
    );
  }
}

export default EventPage;