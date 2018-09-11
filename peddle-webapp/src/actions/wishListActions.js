import {ADD_TO_WISHLIST, LOAD_WISHLIST, REMOVE_FROM_WISHLIST} from "./actionsTypes";

export function loadWishList(wishlist) {
  return{ type: LOAD_WISHLIST, data: wishlist}
}

export function addToWishList(event) {
  return{ type: ADD_TO_WISHLIST, data: event}
}

export function removeFromWishList(eventId) {
  return{ type: REMOVE_FROM_WISHLIST, data: eventId}
}