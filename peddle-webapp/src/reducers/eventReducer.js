import {EVENTS_FILTER, CHOOSE_EVENT} from "../actions/actionsTypes";

const initialState = {
  city: '',
  dateFrom: '22/05/1974',
  dateTo: '30/12/2074',
  event: ''
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS_FILTER:
      return {event: action.data};
    case CHOOSE_EVENT:
      let event = action.data;
      return state.concat(event);
    default:
      return state;
  }
}

export default eventReducer;