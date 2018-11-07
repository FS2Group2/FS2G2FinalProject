import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Event from '../components/Event';
import EventFilters from '../components/EventFilters';
import '../css/eventsPage.css';
import PageNotFound from "./PageNotFound";
import Preloader from "./Preloader";
import {connect} from "react-redux";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {eventsByFilter} from "../constants/queryTypes";
import {chooseEvent} from "../actions/eventActions";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageSize: 12,
    }
  }

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
    this.doFilter();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.filter.city !== this.props.filter.city ||
      prevProps.filter.category !== this.props.filter.category ||
      prevProps.filter.dateStart !== this.props.filter.dateStart||
      prevProps.filter.dateFin !== this.props.filter.dateFin) {
      this.doFilter()

    }
  }

  doFilter() {
    const {page, pageSize} = this.state;
    const {fetchDataFromApi, filter} = this.props;
    let query = {
      page: page,
      pageSize: pageSize,
      cityName: filter.city,
      dateStart: filter.dateStart,
      dateFin: filter.dateFin,
      categoryId: filter.category
    };
    fetchDataFromApi(eventsByFilter, query);
  };

  render() {
    const {setChosenEvent, isFetchPending,isFetchSuccess} = this.props;
    const events = this.props.eventsState.events;
    if (isFetchPending) {
      return <Preloader/>
    } else if (isFetchSuccess) {
      return (
        <div className='page-content'>
          <h2 className='events-header'>Upcoming events</h2>
          <div className='events-page'>
            <div className='filters-container'>
              <EventFilters filterStyle={''}/>
            </div>
            <div className='events-container'>
              {events[0] ? events.map(event =>
                <Link key={event.id} to={'/event/' + event.id} onClick={() => setChosenEvent(event.id)}>
                  <Event theEvent={event}/>
                </Link>):
              <h3>No events at this time. Please select a different period, city or event category.</h3>}

              <input type='button' className='nav-btn previous' value='previous'
                     onClick={this.goToPrevious.bind(this)} disabled={!this.state.page}/>
              <input type='button' className='nav-btn next' value='next' onClick={this.goToNext.bind(this)}
                     disabled={!events[this.state.pageSize - 1]}/>
            </div>

          </div>
        </div>
      );
    }
    else {
      return setTimeout(() => <PageNotFound/>, 1000)
    }

  }
}

const mapStateToProps = (state) => {
  return {
    eventsState: state.eventReducer,
    isFetchSuccess: state.fetchDataReducer.isFetchSuccess,
    isFetchPending: state.fetchDataReducer.isFetchPending,
    fetchError: state.fetchDataReducer.fetchError,
    filter: state.filterReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromApi: (queryType, query) => {
      dispatch(fetchDataFromApi(queryType, query))
    },
    setChosenEvent: (eventId) => {
      dispatch(chooseEvent(eventId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);