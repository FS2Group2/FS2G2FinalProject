import {
  SET_CITY_FOR_TRANSFER_FROM_EVENT,
  SET_CITY_FOR_TRANSFER_TO_EVENT,
  SET_DATE_TRANSFER_FROM_EVENT,
  SET_DATE_TRANSFER_TO_EVENT,
  SET_DAYS_AFTER_EVENT_DEC,
  SET_DAYS_AFTER_EVENT_INC,
  SET_DAYS_BEFORE_EVENT_DEC,
  SET_DAYS_BEFORE_EVENT_INC,
  SET_EVENT_CITY, SET_TRANSFERS_BACKWARD_ERROR, SET_TRANSFERS_BACKWARD_PENDING, SET_TRANSFERS_BACKWARD_SUCCESS,
  SET_TRANSFERS_FORVARD_ERROR,
  SET_TRANSFERS_FORVARD_PENDING,
  SET_TRANSFERS_FORVARD_SUCCESS
} from "./actionsTypes";

export function setEventCity(city) {
  return {
    type: SET_EVENT_CITY, city
  }
}

export function setCityForTransferToEvent(city) {
  return {
    type: SET_CITY_FOR_TRANSFER_TO_EVENT, city
  }
}

export function setCityForTransferFromEvent(city) {
  return {
    type: SET_CITY_FOR_TRANSFER_FROM_EVENT, city
  }
}

export function setDatesForTransferToEvent(date1, date2) {
  return {
    type: SET_DATE_TRANSFER_TO_EVENT, date1, date2
  }
}

export function setDatesForTransferFromEvent(date1, date2) {
  return {
    type: SET_DATE_TRANSFER_FROM_EVENT, date1, date2
  }
}

export function setDaysBeforeEventInc() {
  return {type: SET_DAYS_BEFORE_EVENT_INC}
}

export function setDaysBeforeEventDec() {
  return {type: SET_DAYS_BEFORE_EVENT_DEC}
}

export function setDaysAfterEventInc() {
  return {type: SET_DAYS_AFTER_EVENT_INC}
}

export function setDaysAfterEventDec() {
  return {type: SET_DAYS_AFTER_EVENT_DEC}
}

export function setTransfersForwardPending(isTransfersForwardPending) {
  return {type: SET_TRANSFERS_FORVARD_PENDING, payload: isTransfersForwardPending}
}

export function setTransfersForwardSuccess(isTransfersForwardSuccess) {
  return {type: SET_TRANSFERS_FORVARD_SUCCESS, payload: isTransfersForwardSuccess}
}

export function setTransfersForwardError(transferForwardError) {
  return {type: SET_TRANSFERS_FORVARD_ERROR, payload: transferForwardError}
}

export function setTransfersBackwardPending(isTransfersBackwardPending) {
  return{type: SET_TRANSFERS_BACKWARD_PENDING, payload: isTransfersBackwardPending}
}

export function setTransfersBackwardSuccess(isTransfersBackwardSuccess) {
  return{type: SET_TRANSFERS_BACKWARD_SUCCESS, payload: isTransfersBackwardSuccess}
}

export function setTransfersBackwardError(transfersBackwardError) {
  return {type: SET_TRANSFERS_BACKWARD_ERROR, payload: transfersBackwardError}
}