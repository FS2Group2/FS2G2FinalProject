import {
  LOAD_TRANSFERS_BACKWARD,
  LOAD_TRANSFERS_FORWARD, RESET_DAYS_DELTA,
  SET_CITY_FOR_TRANSFER_FROM_EVENT,
  SET_CITY_FOR_TRANSFER_TO_EVENT,
  SET_DATE_TRANSFER_FROM_EVENT,
  SET_DATE_TRANSFER_TO_EVENT,
  SET_DAYS_AFTER_EVENT_DEC,
  SET_DAYS_AFTER_EVENT_INC,
  SET_DAYS_BEFORE_EVENT_DEC,
  SET_DAYS_BEFORE_EVENT_INC,
  SET_EVENT_CITY,
  SET_TRANSFERS_BACKWARD_ERROR,
  SET_TRANSFERS_BACKWARD_PENDING,
  SET_TRANSFERS_BACKWARD_SUCCESS,
  SET_TRANSFERS_FORWARD_ERROR,
  SET_TRANSFERS_FORWARD_PENDING,
  SET_TRANSFERS_FORWARD_SUCCESS
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
  daysAfterEvent: 0,
  isTransfersForwardPending: false,
  isTransfersForwardSuccess: false,
  transferForwardError: null,
  isTransfersBackwardPending: false,
  isTransfersBackwardSuccess: false,
  transfersBackwardError: null
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
    case RESET_DAYS_DELTA:
      return{...state, daysAfterEvent: 0, daysBeforeEvent: 0};
    case LOAD_TRANSFERS_FORWARD:
      return {...state, transfersForward: action.payload};
    case LOAD_TRANSFERS_BACKWARD:
      return {...state, transfersBackward: action.payload};
    case SET_TRANSFERS_FORWARD_PENDING:
      return {...state, isTransfersForwardPending: action.payload};
    case SET_TRANSFERS_FORWARD_SUCCESS:
      return {...state, isTransfersForwardSuccess: action.payload};
    case SET_TRANSFERS_FORWARD_ERROR:
      return {...state, transferForwardError: action.payload};
    case SET_TRANSFERS_BACKWARD_PENDING:
      return {...state, isTransfersBackwardPending: action.payload};
    case SET_TRANSFERS_BACKWARD_SUCCESS:
      return {...state, isTransfersBackwardSuccess: action.payload};
    case SET_TRANSFERS_BACKWARD_ERROR:
      return {...state, transfersBackwardError: action.payload};
    default:
      return state;
  }
}

export default transferReducer;