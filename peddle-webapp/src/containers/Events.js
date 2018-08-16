import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Event from '../components/Event';
import EventFilters from '../components/EventFilters';
import '../css/eventsPage.css';
import PageNotFound from "./PageNotFound";
import dataMap from '../constants/ApiSettings';
import Preloader from "./Preloader";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      targetCity: ''
    }
  }

  updateCity(v) {
    this.setState({targetCity: v})
  };

  componentDidMount() {
    const url = dataMap.allEvents;
    // const url = '/events.json';
    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                isLoaded: true,
                events: result
              })
            },

            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            }
        )
  };

  render() {
    const {error, isLoaded, events, targetCity} = this.state;
    const cities = [];
    let eventsLabel = '';
    if (error) {
      return <PageNotFound/>
    } else if (!isLoaded) {
      return <Preloader/>
    } else {

      this.state.events.map(event => {
        if (cities.findIndex(c => c === event.city) === -1) cities.push(event.city);
        return cities;
      });
      cities.sort();

      if (targetCity) eventsLabel = 'in ' + targetCity;
      return (
          <div>
            <h2 className='events-header'>Current events {eventsLabel}</h2>
            <div className='events-page'>
              <div className='filters-container'>
                <EventFilters cities={cities} updateMyCity={this.updateCity.bind(this)}/>
              </div>
              <div className='events-container'>
                {events.map(event =>
                    <Link key={event.id} to='/event'>
                      <Event theEvent={event}/>
                    </Link>)}
              </div>
            </div>
          </div>
      );
    }
  }
}

export default Events;