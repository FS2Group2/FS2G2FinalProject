import {ADD_TO_WISHLIST, LOAD_WISHLIST, REMOVE_FROM_WISHLIST} from "./actionsTypes";

export function loadWishList(wishlist) {
  return {type: LOAD_WISHLIST, payload: wishlist}
}

export function addToWishList(wishlist) {
  return {type: ADD_TO_WISHLIST, payload: wishlist}
}

export function removeFromWishList(wishlist) {
  return {type: REMOVE_FROM_WISHLIST, payload: wishlist}

}