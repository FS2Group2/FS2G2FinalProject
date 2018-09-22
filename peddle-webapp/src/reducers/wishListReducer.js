import {ADD_TO_WISHLIST, LOAD_WISHLIST, REMOVE_FROM_WISHLIST} from "../actions/actionsTypes";

function wishListReducer(state=[], action) {
  switch (action.type) {
    case LOAD_WISHLIST:
      return action.payload;
    case ADD_TO_WISHLIST:
      return action.payload;
    case REMOVE_FROM_WISHLIST:
      return action.payload;
    default:
      return state;
  }
}

export default wishListReducer;