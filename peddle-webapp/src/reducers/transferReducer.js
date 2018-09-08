import {
  SET_CITY_FOR_TRANSFER_FROM_EVENT,
  SET_CITY_FOR_TRANSFER_TO_EVENT,
  SET_DATE_TRANSFER_FROM_EVENT,
  SET_DATE_TRANSFER_TO_EVENT
} from "../actions/actionsTypes";

const initialState = {
  cityTransferToEvent: '',
  cityTransferFromEvent: '',
  dateTransferToEvent: '',
  dateTransferFromEvent: ''
}

function transferReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CITY_FOR_TRANSFER_TO_EVENT:
      return {cityTransferToEvent: action.city};
    case SET_CITY_FOR_TRANSFER_FROM_EVENT:
      return {cityTransferFromEvent: action.city}
    case SET_DATE_TRANSFER_TO_EVENT:
      return {dateTransferToEvent: action.transferDate};
    case SET_DATE_TRANSFER_FROM_EVENT:
      return {dateTransferToEvent: action.transferDate};
    default:
      return state;
  }
}

export default transferReducer;