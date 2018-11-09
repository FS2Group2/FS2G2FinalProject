import {
  ADD_ACCOMMODATION_TO_CART,
  ADD_EVENT_TO_CART,
  ADD_PHOTOGRAPHER_TO_CART,
  ADD_TRANSFER_FROM_EVENT_TO_CARD,
  ADD_TRANSFER_TO_EVENT_TO_CART,
  ADD_TRANSLATOR_TO_CART
} from "./actionsTypes";

export function addEventToCart(event) {
  return {type: ADD_EVENT_TO_CART, payload: event}
}

export function addAccommodationToCart(accommodation) {
  return {type: ADD_ACCOMMODATION_TO_CART, payload: accommodation}
}

export function addTransferToEventToCart(transfer) {
  return {type: ADD_TRANSFER_TO_EVENT_TO_CART, payload: transfer}
}

export function addTransferFromEventToCart(transfer) {
  return {type: ADD_TRANSFER_FROM_EVENT_TO_CARD, payload: transfer}
}

export function addTranslatorToCart(translator) {
  return {type: ADD_TRANSLATOR_TO_CART, payload: translator}
}

export function addPhotographerToCart(photographer) {
  return {type: ADD_PHOTOGRAPHER_TO_CART, payload: photographer}
}