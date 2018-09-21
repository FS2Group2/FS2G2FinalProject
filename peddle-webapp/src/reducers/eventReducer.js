import {
  CHOSEN_EVENT,
  LOAD_EVENT_INFO,
  LOAD_EVENTS, SET_EVENT_INFO_ERROR,
  SET_EVENT_INFO_PENDING,
  SET_EVENT_INFO_SUCCESS
} from "../actions/actionsTypes";

const initialState = {
  event: '',
  eventInfo: {},
  events: [],
  isEventInfoSuccess: false,
  isEventInfoPending: false,
  eventInfoError: null
};

function eventReducer(state = initialState, action) {
  switch (action.type) {
    case CHOSEN_EVENT:
      return {...state, event: action.eventId};
    case SET_EVENT_INFO_PENDING:
      return{...state, isEventInfoPending: action.payload};
    case SET_EVENT_INFO_SUCCESS:
      return{...state, isEventInfoSuccess: action.payload};
    case SET_EVENT_INFO_ERROR:
      return{...state, eventInfoError: action.payload};
    case LOAD_EVENTS:
      return {...state, events: action.payload};
    case LOAD_EVENT_INFO:
      return {...state, eventInfo: action.payload};
    default:
      return state;
  }
}

export default eventReducer;