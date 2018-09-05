import {ADD_TO_WISHLIST, LOAD_WISHLIST, REMOVE_FROM_WISHLIST} from "../actions/actionsTypes";

function wishListReducer(state=[], action) {
  switch (action.type) {
    case LOAD_WISHLIST:
      return Object.assign({}, state, action.data);
    case ADD_TO_WISHLIST:
      return state;
    case REMOVE_FROM_WISHLIST:
      return state;
    default:
      return state;
  }
}

export default wishListReducer;