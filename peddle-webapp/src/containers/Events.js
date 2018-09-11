import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Event from '../components/Event';
import EventFilters from '../components/EventFilters';
import '../css/eventsPage.css';
import PageNotFound from "./PageNotFound";
import dataMap from '../constants/ApiSettings';
import Preloader from "./Preloader";
import {connect} from "react-redux";
import {chooseEvent} from "../actions/eventActions";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      cities: [],
      page: 0,
      pageSize: 12,
      targetCity: '',
      dateStart: new Date(Date.now()).toLocaleDateString('en-GB'),
      dateFin: '01/01/2050'
    }
  }

  setCity = (v) => {
    this.setState({targetCity: v}, () => {
      this.doFilter()
    })
  };

  setDateStart(ds) {
    this.setState({dateStart: new Date(ds).toLocaleDateString('en-GB')});
  };

  setDateFin(df) {
    this.setState({dateFin: new Date(df).toLocaleDateString('en-GB')});
  };

  applyFilter = () => {
    this.setState({
      page: 0
    }, () => {
      this.doFilter()
    })
  };

  resetFilter = () => {
    this.setState({
      targetCity: '',
      dateStart: new Date(Date.now()).toLocaleDateString('en-GB'),
      dateFin: '01/01/2050'
    }, () => {
      this.doFilter()
    })
  };

  goToNext = () => {
    this.setState({page: this.state.page + 1}, () => {
      this.doFilter()
    })
  };

  goToPrevious = () => {
    if (this.state.page > 0) {
      this.setState({page: this.state.page - 1}, () => {
        this.doFilter()
      })
    }
  };

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

  doFilter() {
    let filterHeader = new Headers();
    filterHeader.append("Content-Type", "application/JSON");
    let query = {
      page: this.state.page,
      pageSize: this.state.pageSize,
      cityName: this.state.targetCity,
      dateStart: this.state.dateStart,
      dateFin: this.state.dateFin
    };
    let reqParam = {
      method: 'POST',
      headers: filterHeader,
      body: JSON.stringify(query)
    };
    const url = dataMap.filterEvents;
    console.log('request params:' + JSON.stringify(reqParam));
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
    const {error, isLoaded, events} = this.state;
    const {setChosenEvent} = this.props;
    if (error) {
      return <PageNotFound/>
    } else if (!isLoaded) {
      return <Preloader/>
    } else {
      return (
        <div>
          <h2 className='events-header'>upcoming events in Ukraine</h2>
          <div className='events-page'>
            <div className='filters-container'>
              <EventFilters
                updateMyCity={this.setCity.bind(this)}
                setDateFrom={this.setDateStart.bind(this)}
                setDateTo={this.setDateFin.bind(this)}
                doFilter={this.applyFilter.bind(this)}
                resetFilter={this.resetFilter.bind(this)}
              />
            </div>
            <div className='events-container'>
              {events[0] && events.map(event =>
                <Link key={event.id} to={'/event/' + event.id} onClick={() => setChosenEvent(event.id)}>
                  <Event theEvent={event}/>
                </Link>)}

              <input type='button' className='nav-btn previous' value='previous'
                     onClick={this.goToPrevious.bind(this)} disabled={!this.state.page}/>
              <input type='button' className='nav-btn next' value='next' onClick={this.goToNext.bind(this)}
                     disabled={!this.state.events[this.state.pageSize - 1]}/>
              {/*<label className='page-num'> Page {page + 1}</label>*/}
            </div>

          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    eventsState: state.eventReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChosenEvent: (userId) => {
      dispatch(chooseEvent(userId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);