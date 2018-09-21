import {ADD_TO_PURCHASES, LOAD_PURCHASE_LIST} from "../actions/actionsTypes";

function purchaseReducer(state = [], action) {
  switch (action.type) {
    case LOAD_PURCHASE_LIST:
      return action.payload;

    case ADD_TO_PURCHASES:
      return action.payload;
    default:
      return state;
  }
}

export default purchaseReducer;