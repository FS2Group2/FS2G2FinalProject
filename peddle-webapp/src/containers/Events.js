import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Event from '../components/Event';
import EventFilters from '../components/EventFilters';
import '../css/eventsPage.css';
import PageNotFound from "./PageNotFound";
import dataMap from '../constants/ApiSettings';
import Preloader from "./Preloader";
import {connect} from "react-redux";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      cities: [],
      page: 0,
      pegeSize: 9,
      targetCity: '',
      dateStart: '01/01/2000',
      dateFin: '01/01/2050'
    }
  }

  updateCity(v) {
    this.setState({targetCity: v});
    this.doFilter(v);
  };

  componentWillMount() {
    const urlAllCities = dataMap.allCities;

    fetch(urlAllCities)
        .then(res => res.json())
        .then(
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


  doFilter(city) {
    let filterHeader = new Headers();
    filterHeader.append("Content-Type", "application/JSON");
    let query = {
      page: this.state.page,
      pageSize: this.state.pegeSize,
      cityName: city,
      dateStart: this.state.dateStart,
      dateFin: this.state.dateFin
    };
    let reqParam = {
      method: 'POST',
      headers: filterHeader,
      body: JSON.stringify(query)
    };
    const url = dataMap.filterEvents;

    fetch(url, reqParam)
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
    const {targetCity} = this.props.EventsState;
    const {error, isLoaded, cities, events} = this.state;
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
                    <Link key={event.name} to={'/event/' + event.id}>
                      <Event theEvent={event}/>
                    </Link>)}
              </div>
            </div>
          </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    EventsState: state.eventReducer
  }
};

export default connect(mapStateToProps)(Events);