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
  SET_EVENT_CITY, SET_TRANSFERS_BACKWARD_ERROR, SET_TRANSFERS_BACKWARD_PENDING, SET_TRANSFERS_BACKWARD_SUCCESS,
  SET_TRANSFERS_FORWARD_ERROR,
  SET_TRANSFERS_FORWARD_PENDING,
  SET_TRANSFERS_FORWARD_SUCCESS
} from "./actionsTypes";
import dataMap from "../constants/ApiSettings";
import {fetchData} from "../components/fetchData";

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

export function resetDaysDelta() {
  return{type: RESET_DAYS_DELTA}
}

export function setTransfersForwardPending(isTransfersForwardPending) {
  return {type: SET_TRANSFERS_FORWARD_PENDING, payload: isTransfersForwardPending}
}

export function setTransfersForwardSuccess(isTransfersForwardSuccess) {
  return {type: SET_TRANSFERS_FORWARD_SUCCESS, payload: isTransfersForwardSuccess}
}

export function setTransfersForwardError(transferForwardError) {
  return {type: SET_TRANSFERS_FORWARD_ERROR, payload: transferForwardError}
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

export function setTransfersForward(transfersData) {
  return{type: LOAD_TRANSFERS_FORWARD, payload: transfersData}
}

export function setTransfersBackward(transfersData) {
  return{type: LOAD_TRANSFERS_BACKWARD, payload: transfersData}
}

export function loadTransfersForward(query) {
  return dispatch => {
    dispatch(setTransfersForwardPending(true));
    dispatch(setTransfersForwardSuccess(false));
    dispatch(setTransfersForwardError(null));
    let responseStatus = false;
    let apiUrl = dataMap.transfer;

    fetchData(apiUrl, 'post', query)
      .then(response => {
        dispatch(setTransfersForwardPending(false));
        responseStatus = response.ok;
        return response;
      })
      .then(response => response.json())
      .then(json =>{
        if (responseStatus){
          dispatch(setTransfersForward(json));
          dispatch(setTransfersForwardSuccess(true));
        } else {
          dispatch(setTransfersForwardError(json))
        }
      })
  }
}

export function loadTransfersBackward(query) {
  return dispatch => {
    dispatch(setTransfersBackwardPending(true));
    dispatch(setTransfersBackwardSuccess(false));
    dispatch(setTransfersBackwardError(null));
    let responseStatus = false;
    let apiUrl = dataMap.transfer;

    fetchData(apiUrl, 'post', query)
      .then(response => {
        dispatch(setTransfersBackwardPending(false));
        responseStatus = response.ok;
        return response;
      })
      .then(response => response.json())
      .then(json =>{
        if (responseStatus){
          dispatch(setTransfersBackward(json));
          dispatch(setTransfersBackwardSuccess(true));
        } else {
          dispatch(setTransfersBackwardError(json))
        }
      })
  }
}