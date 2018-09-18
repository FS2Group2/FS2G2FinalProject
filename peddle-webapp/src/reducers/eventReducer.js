import {CHOSEN_EVENT, LOAD_EVENT_INFO, LOAD_EVENTS} from "../actions/actionsTypes";

const initialState = {
  event: '',
  eventInfo: {},
  events: []
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case CHOSEN_EVENT:
      return {...state, event: action.eventId};
    case LOAD_EVENTS:
      return {...state, events: action.payload};
    case LOAD_EVENT_INFO:
      return {...state, eventInfo: action.payload};
    default:
      return state;
  }
}

export default eventReducer;