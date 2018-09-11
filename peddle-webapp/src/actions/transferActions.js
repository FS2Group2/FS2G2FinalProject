import {
  SET_CITY_FOR_TRANSFER_FROM_EVENT,
  SET_CITY_FOR_TRANSFER_TO_EVENT,
  SET_DATE_TRANSFER_FROM_EVENT,
  SET_DATE_TRANSFER_TO_EVENT,
  SET_EVENT_CITY
} from "./actionsTypes";

export function setEventCity(city) {
  return{
    type: SET_EVENT_CITY, city
  }
}

export function setCityForTransferToEvent(city) {
  return{
    type: SET_CITY_FOR_TRANSFER_TO_EVENT, city
  }
}

export function setCityForTransferFromEvent(city) {
  return{
    type: SET_CITY_FOR_TRANSFER_FROM_EVENT, city
  }
}

export function setDatesForTransferToEvent(date1, date2) {
  return{
    type: SET_DATE_TRANSFER_TO_EVENT, date1, date2
  }
}

export function setDatesForTransferFromEvent(date1, date2) {
  return{
    type: SET_DATE_TRANSFER_FROM_EVENT, date1, date2
  }
}