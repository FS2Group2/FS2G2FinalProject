import {filterEvents} from '../actions/eventsFilter'
import {EVENTS_FILTER} from "../actions/actionsTypes";

const initialState = {
  // error: null,
  // isLoaded: false,
  // events: [],
  // cities: [],
  // citiesList: [],
  city: '',
  dateFrom: '22/05/1974',
  dateTo: '30/12/2074'
}

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_FILTER:
      return {...state, ...action.data};
    default:
      return state;
  }
}

export default eventReducer;