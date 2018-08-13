import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Event from '../components/Event';
import EventFilters from '../components/EventFilters';
import '../css/eventsPage.css';
import PageNotFound from "./PageNotFound";
import dataMap from '../constants/ApiSettings';

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      events: []
    }
  }


  componentDidMount() {
    // const url = dataMap.allEvents;
    const url = '/events.json';
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
    const {error, isLoaded, events} = this.state;
    const cities = [];
    if (error) {
      return <PageNotFound/>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {

      {
        this.state.events.map(event => {
          if (cities.findIndex(c => c == event.city) == -1) cities.push(event.city);
        });
        cities.sort();
      }
      return (
          <div>
            <h2 className='events-header'>Current events</h2>
            <div className='events-page'>

              <div className='filters-container'>
                <EventFilters cities={cities}/>
              </div>

              <div className='events-container'>
                {this.state.events.map(event =>
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