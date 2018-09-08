import {SET_CITY_FOR_TRANSFER_FROM_EVENT, SET_CITY_FOR_TRANSFER_TO_EVENT} from "./actionsTypes";

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