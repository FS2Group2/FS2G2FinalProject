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
      error: null,
      isLoaded: false,
      // events: [],
      // cities: [],
      page: 0,
      pageSize: 12,
      categoryId: 0,
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

  setCategory = (v) => {
    this.setState({categoryId: v}, () => {
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
    const category = this.props.match.params.categoryId;
    category.toString() === "all" ?
      this.setState({categoryId: 0}, () => this.doFilter()) : this.setState({categoryId: category}, () => this.doFilter());
  };

  doFilter() {
    const {page, categoryId, pageSize, targetCity, dateStart, dateFin} = this.state;
    const {fetchDataFromApi} = this.props;
    let query = {
      page: page,
      pageSize: pageSize,
      cityName: targetCity,
      dateStart: dateStart,
      dateFin: dateFin,
      categoryId: categoryId
    };
    fetchDataFromApi(eventsByFilter, query);
  };

  render() {
    const {setChosenEvent, isLoginPending, isLoginSuccess} = this.props;
    const events = this.props.eventsState.events;
    if (isLoginPending) {
      return <Preloader/>
    } else if (isLoginSuccess) {
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
                selectCategory={this.setCategory.bind(this)}
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
    isLoginSuccess: state.fetchDataReducer.isLoginSuccess,
    isLoginPending: state.fetchDataReducer.isLoginPending,
    fetchError: state.fetchDataReducer.fetchError
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