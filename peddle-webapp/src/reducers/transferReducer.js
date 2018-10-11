import {
  LOAD_TRANSFERS_BACKWARD,
  LOAD_TRANSFERS_FORWARD,
  SET_CITY_FOR_TRANSFER_FROM_EVENT,
  SET_CITY_FOR_TRANSFER_TO_EVENT,
  SET_DATE_TRANSFER_FROM_EVENT,
  SET_DATE_TRANSFER_TO_EVENT,
  SET_DAYS_AFTER_EVENT_DEC,
  SET_DAYS_AFTER_EVENT_INC,
  SET_DAYS_BEFORE_EVENT_DEC,
  SET_DAYS_BEFORE_EVENT_INC,
  SET_EVENT_CITY
} from "../actions/actionsTypes";

const initialState = {
  eventCity: '',
  cityTransferDepartToEvent: '',
  cityTransferArrivalFromEvent: '',
  dateTransferToEvent1: '',
  dateTransferToEvent2: '',
  dateTransferFromEvent1: '',
  dateTransferFromEvent2: '',
  transfersForward: [],
  transfersBackward: [],
  daysBeforeEvent: 0,
  daysAfterEvent: 0
};

function transferReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CITY_FOR_TRANSFER_TO_EVENT:
      return {...state, cityTransferDepartToEvent: action.city};
    case SET_EVENT_CITY:
      return {...state, eventCity: action.city};
    case SET_CITY_FOR_TRANSFER_FROM_EVENT:
      return {...state, cityTransferArrivalFromEvent: action.city};
    case SET_DAYS_BEFORE_EVENT_DEC:
      return {...state, daysBeforeEvent: state.daysBeforeEvent - 1};
    case SET_DAYS_BEFORE_EVENT_INC:
      return {...state, daysBeforeEvent: state.daysBeforeEvent + 1};
    case SET_DAYS_AFTER_EVENT_DEC:
      return {...state, daysAfterEvent: state.daysAfterEvent - 1};
    case SET_DAYS_AFTER_EVENT_INC:
      return {...state, daysAfterEvent: state.daysAfterEvent + 1};
    case SET_DATE_TRANSFER_TO_EVENT:
      return {...state, dateTransferToEvent1: action.date1, dateTransferToEvent2: action.date2};
    case SET_DATE_TRANSFER_FROM_EVENT:
      return {...state, dateTransferFromEvent1: action.date1, dateTransferFromEvent2: action.date2};
    case LOAD_TRANSFERS_FORWARD:
      return {...state, transfersForward: action.payload};
    case LOAD_TRANSFERS_BACKWARD:
      return {...state, transfersBackward: action.payload};
    default:
      return state;
  }
}

export default transferReducer;