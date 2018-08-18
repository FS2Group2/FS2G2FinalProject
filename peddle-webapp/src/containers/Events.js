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
      cities: [],
      citiesList: [],
      targetCity: ''
    }
  }

  updateCity(v) {
    this.setState({targetCity: v});
    this.doFilter();
  };

  componentWillMount() {
    const urlAllCities = dataMap.allCities;

    fetch(urlAllCities)
        .then(res => res.json())
        .then
        (
            (result) => {
              this.setState({
                isLoaded: true,
                cities: result
              })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            }
        );
  }

  componentDidMount() {
    const urlAllEvents = dataMap.allEvents;

    fetch(urlAllEvents)
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
        );
  };

  doFilter(){
    const url = dataMap.filteredEvents;
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
        );
  };


  render() {
    const {error, isLoaded, events, cities, targetCity} = this.state;
    if (error) {
      return <PageNotFound/>
    } else if (!isLoaded) {
      return <Preloader/>
    } else {
      return (
          <div>
            <h2 className='events-header'>Current events {targetCity && ('in ' + targetCity)}</h2>
            <div className='events-page'>
              <div className='filters-container'>
                <EventFilters cities={cities} updateMyCity={this.updateCity.bind(this)}/>
              </div>
              <div className='events-container'>
                {events[0] && events.map(event =>
                    <Link key={event.id} to={'/event/' + event.id}>
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