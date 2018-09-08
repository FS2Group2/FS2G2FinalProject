import {FILL_CITIES_LIST} from "../actions/actionsTypes";

const initialState = [];

function fillListsReducer(state = initialState, action) {
  switch (action.type) {
    case FILL_CITIES_LIST:
      return action.citiesList;
    default:
      return state;
  }
}

export default fillListsReducer;